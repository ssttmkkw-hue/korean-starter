"""
读取 scripts/audio-queue.json，用 edge-tts 免费神经网络语音批量生成 mp3，
存到 public/audio/，并写出 src/data/audioManifest.json 供前端查表播放。
可重复运行：已存在的文件会跳过，只补生成新增/缺失的内容。
"""
import asyncio
import hashlib
import json
import os
import sys

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_PATH = os.path.join(ROOT, "scripts", "audio-queue.json")
AUDIO_DIR = os.path.join(ROOT, "public", "audio")
MANIFEST_PATH = os.path.join(ROOT, "src", "data", "audioManifest.json")

VOICE_MAP = {
    "F": "ko-KR-SunHiNeural",
    "M": "ko-KR-InJoonNeural",
}

CONCURRENCY = 6


def file_name_for(voice, text):
    h = hashlib.md5(f"{voice}|{text}".encode("utf-8")).hexdigest()[:16]
    return f"{h}.mp3"


async def synth_one(entry, sem, manifest, done_counter, total):
    text = entry["text"]
    voice_key = entry["voice"]
    voice_id = VOICE_MAP[voice_key]
    fname = file_name_for(voice_key, text)
    fpath = os.path.join(AUDIO_DIR, fname)
    manifest_key = f"{voice_key}|{text}"

    if os.path.exists(fpath) and os.path.getsize(fpath) > 0:
        manifest[manifest_key] = f"/audio/{fname}"
        done_counter[0] += 1
        return

    async with sem:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, voice_id)
                await communicate.save(fpath)
                manifest[manifest_key] = f"/audio/{fname}"
                break
            except Exception as e:  # noqa: BLE001
                if attempt == 2:
                    print(f"FAILED after 3 tries: {voice_key} {text!r} -> {e}", file=sys.stderr)
                else:
                    await asyncio.sleep(1.5)
    done_counter[0] += 1
    if done_counter[0] % 25 == 0 or done_counter[0] == total:
        print(f"progress: {done_counter[0]}/{total}", flush=True)


async def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    with open(QUEUE_PATH, encoding="utf-8") as f:
        queue = json.load(f)

    manifest = {}
    if os.path.exists(MANIFEST_PATH):
        with open(MANIFEST_PATH, encoding="utf-8") as f:
            try:
                manifest = json.load(f)
            except json.JSONDecodeError:
                manifest = {}

    total = len(queue)
    print(f"total clips to ensure: {total}")
    sem = asyncio.Semaphore(CONCURRENCY)
    done_counter = [0]
    tasks = [synth_one(entry, sem, manifest, done_counter, total) for entry in queue]
    await asyncio.gather(*tasks)

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False)

    print(f"done. manifest entries: {len(manifest)}")


if __name__ == "__main__":
    asyncio.run(main())
