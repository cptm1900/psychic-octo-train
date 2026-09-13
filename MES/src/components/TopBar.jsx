import './TopBar.css'
import { useNow, formatDate, formatTime, WEEKDAY } from '../hooks/useNow'

/**
 * 화면 공통 상단바.
 * onHome이 주어지면 로고가 메인(화면 선택)으로 돌아가는 버튼이 되고,
 * worker가 주어지면 시계 위에 로그인한 작업자를 표시한다.
 */
export default function TopBar({ title, subtitle, worker, onHome }) {
  const now = useNow()

  const brand = (
    <img className="brand__logo" src="/logo-i3system.png" alt="i3system 아이쓰리시스템(주)" />
  )

  return (
    <header className="topbar">
      {onHome ? (
        <button
          type="button"
          className="brand brand--link"
          onClick={onHome}
          title="메인 화면으로 이동"
          aria-label="메인 화면으로 이동"
        >
          {brand}
        </button>
      ) : (
        <div className="brand">{brand}</div>
      )}

      <div className="topbar__center">
        <h1 className="topbar__title">{title}</h1>
        {subtitle ? <p className="topbar__subtitle">{subtitle}</p> : null}
      </div>

      <div className="topbar__right">
        {worker ? <span className="topbar__worker">작업자 : {worker}님</span> : null}
        <span className="clock__date num">
          {formatDate(now)} ({WEEKDAY[now.getDay()]})
        </span>
        <span className="clock__time num">{formatTime(now)}</span>
      </div>
    </header>
  )
}
