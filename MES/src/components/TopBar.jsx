import './TopBar.css'
import { useNow, formatDate, formatTime, WEEKDAY } from '../hooks/useNow'

export default function TopBar() {
  const now = useNow()
  return (
    <header className="topbar">
      <div className="brand">
        <img className="brand__logo" src="/logo-i3system.png" alt="i3system 아이쓰리시스템(주)" />
        <span className="brand__tagline">Intelligent Image &amp; Information System</span>
      </div>

      <div className="topbar__center">
        <h1 className="topbar__title">생산 대시보드</h1>
        <p className="topbar__subtitle">적외선 영상센서 · 검출기 조립/검사 공정</p>
      </div>

      <div className="topbar__right">
        <span className="clock__date num">
          {formatDate(now)} ({WEEKDAY[now.getDay()]})
        </span>
        <span className="clock__time num">{formatTime(now)}</span>
      </div>
    </header>
  )
}
