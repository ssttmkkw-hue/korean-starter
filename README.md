# 韩语入门 · 한국어 첫걸음

面向中文母语初学者的韩语学习网站（React + Vite，纯前端静态站）。

模块：入门课程、学校课程、磨耳朵、开口说（语音识别 + AI 对话）、字母、发音精讲、拼读表、单词、语句、对话、造句练习、留学故事、韩剧学韩语、传统故事。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build   # 输出到 dist/
```

构建用相对路径（`base: './'`），可以放在 GitHub Pages 子路径或任何静态托管上。

## 语音

朗读用预先生成的 mp3（`public/audio/`，由 `edge-tts` 合成，女声 SunHi / 男声 InJoon），清单在 `src/data/audioManifest.json`。新增文本后：

```bash
node scripts/extract-audio-queue.mjs
python scripts/generate_audio.py   # 需要 pip install -U edge-tts，可断点续传
```

找不到预生成音频时回退到浏览器自带的语音合成。

## 开口说

浏览器 Web Speech API 识别韩语（建议用 Edge），AI 对话走一个函数计算代理（见 `src/utils/koreanAi.js`），代理不可用时会提示重试。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
