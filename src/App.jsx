import { useState } from 'react'
import { useKoreanTTS } from './useKoreanTTS'
import Dictionary from './components/Dictionary'
import './App.css'
import './school.css'
import './immerse.css'
import './speak.css'

function App() {
  const [slow, setSlow] = useState(false)
  const { speak, stop, supported, hasKoreanVoice, hasAudioFiles } = useKoreanTTS()

  return (
    <div className="app">
      <header className="header">
        <h1>韩语入门 · 한국어 첫걸음</h1>
        <p className="subtitle">字母、拼读表、单词、生活语句一次看全，点韩文听发音，点"答案"自测</p>
        {!supported && (
          <p className="warning">你的浏览器不支持语音朗读，建议使用最新版 Chrome 或 Edge。</p>
        )}
        {supported && !hasKoreanVoice && !hasAudioFiles && (
          <p className="warning">
            未检测到系统内置的韩语语音包，朗读可能使用默认语言发音，效果会打折扣。
          </p>
        )}
      </header>

      <Dictionary speak={speak} stop={stop} slow={slow} setSlow={setSlow} />

      <footer className="footer">
        提示：点韩文朗读，点"答案"显示罗马音和中文意思、再点一下隐藏，方便自测记忆。发音由浏览器 TTS 合成，非真人录音。
      </footer>
    </div>
  )
}

export default App
