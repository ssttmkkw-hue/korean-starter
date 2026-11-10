import { useCallback, useEffect, useRef, useState } from 'react'

const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null

const ERROR_TEXT = {
  'not-allowed': '麦克风被拒绝了：请在浏览器地址栏左侧的权限里允许使用麦克风。',
  'service-not-allowed': '当前环境不允许语音识别（浏览器没有开放这个功能）。',
  'audio-capture': '没有找到麦克风，请检查设备是否接好。',
  network: '语音识别服务连不上。Chrome 的识别要连 Google 的服务，国内常常不通；Edge 浏览器用微软的服务，一般可以。也可以直接打字。',
  'language-not-supported': '这个浏览器不支持韩语识别。',
}

// 只识别韩语（lang 固定 ko-KR）。start(onFinal) 在识别结束且有结果时回调一次最终文本。
export function useKoreanASR() {
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [error, setError] = useState('')
  const recRef = useRef(null)
  const cbRef = useRef(null)
  const textRef = useRef('')
  const errRef = useRef('')

  useEffect(
    () => () => {
      try {
        recRef.current?.abort()
      } catch {
        // 已经停了
      }
    },
    [],
  )

  const start = useCallback((onFinal) => {
    if (!SR) return false
    try {
      recRef.current?.abort()
    } catch {
      // 忽略
    }
    const rec = new SR()
    rec.lang = 'ko-KR'
    rec.interimResults = true
    rec.continuous = false
    rec.maxAlternatives = 1
    cbRef.current = onFinal
    textRef.current = ''
    errRef.current = ''
    setError('')
    setInterim('')

    rec.onstart = () => setListening(true)
    rec.onresult = (e) => {
      let fin = ''
      let tmp = ''
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) fin += r[0].transcript
        else tmp += r[0].transcript
      }
      textRef.current = fin || tmp
      setInterim(fin + tmp)
    }
    rec.onerror = (e) => {
      if (e.error === 'aborted') return
      errRef.current = e.error
      setError(e.error === 'no-speech' ? '没有听到声音，靠近麦克风再说一次。' : ERROR_TEXT[e.error] || `语音识别出错：${e.error}`)
    }
    rec.onend = () => {
      setListening(false)
      setInterim('')
      const text = textRef.current.trim()
      const cb = cbRef.current
      textRef.current = ''
      if (text && cb) cb(text)
      else if (!errRef.current && recRef.current === rec) setError('没听清，请再说一次。')
    }
    recRef.current = rec
    try {
      rec.start()
      return true
    } catch {
      setError('麦克风启动失败，请稍后再试。')
      return false
    }
  }, [])

  const stop = useCallback(() => {
    try {
      recRef.current?.stop()
    } catch {
      // 忽略
    }
  }, [])

  const cancel = useCallback(() => {
    cbRef.current = null
    textRef.current = ''
    try {
      recRef.current?.abort()
    } catch {
      // 忽略
    }
    setListening(false)
    setInterim('')
  }, [])

  return { supported: !!SR, listening, interim, error, setError, start, stop, cancel }
}
