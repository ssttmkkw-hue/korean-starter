import { useEffect, useRef, useState } from 'react'
import audioManifest from './data/audioManifest.json'

// 优先播放预生成的真人感神经网络语音（edge-tts, F=女声 SunHi / M=男声 InJoon）；
// 找不到对应音频文件时，回退到浏览器内置的语音合成（Web Speech API）
export function useKoreanTTS() {
  const [voice, setVoice] = useState(null)
  const [supported, setSupported] = useState(true)
  const audioElRef = useRef(null)

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false)
      return
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const koVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('ko'))
      if (koVoice) setVoice(koVoice)
    }

    pickVoice()
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', pickVoice)
  }, [])

  const speakBrowser = (text, rate, onEnd) => {
    if (!supported) {
      onEnd?.()
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'ko-KR'
    utter.rate = rate
    if (voice) utter.voice = voice
    if (onEnd) utter.onend = onEnd
    window.speechSynthesis.speak(utter)
  }

  // voice: 'F'（默认，女声）| 'M'（男声，用于对话 B 角色）
  const speak = (text, { rate = 1, voice: voiceKey = 'F', onEnd } = {}) => {
    if (audioElRef.current) {
      audioElRef.current.pause()
      audioElRef.current = null
    }
    if (supported) window.speechSynthesis.cancel()

    const entry = audioManifest[`${voiceKey}|${text}`]
    // manifest 里存的是 /audio/xxx.mp3，部署在子路径时要接上 base
    const path = entry && import.meta.env.BASE_URL + entry.replace(/^\//, '')
    if (path) {
      const audio = new Audio(path)
      audio.playbackRate = rate
      audioElRef.current = audio
      if (onEnd) audio.addEventListener('ended', onEnd, { once: true })
      // error 事件和 play() 的 reject 可能同时出现，只回退一次；
      // 已经被新的 speak/stop 打断的音频（play() 会以 AbortError reject）不再回退，避免旧句子重新响起、onEnd 多触发
      let fellBack = false
      const fallback = () => {
        if (fellBack || audioElRef.current !== audio) return
        fellBack = true
        speakBrowser(text, rate, onEnd)
      }
      audio.addEventListener('error', fallback, { once: true })
      audio.play().catch(fallback)
      return
    }
    speakBrowser(text, rate, onEnd)
  }

  const stop = () => {
    if (audioElRef.current) {
      audioElRef.current.pause()
      audioElRef.current = null
    }
    if (supported) window.speechSynthesis.cancel()
  }

  const audioCount = Object.keys(audioManifest).length

  return { speak, stop, supported, hasKoreanVoice: !!voice, hasAudioFiles: audioCount > 0 }
}
