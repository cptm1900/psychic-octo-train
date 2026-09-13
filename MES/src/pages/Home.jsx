import './Home.css'
import { useNow, formatDate, formatTime, WEEKDAY } from '../hooks/useNow'

const ICONS = {
  admin: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2.5" />
      <path d="M7 14.5V11M11 14.5V8.5M15 14.5v-2.5M19 14.5V7" strokeLinecap="round" />
      <path d="M8 21h8" strokeLinecap="round" />
    </>
  ),
  worker: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M7.5 13.5h4M7.5 16.5h4M15 13.5h2M15 16.5h2" strokeLinecap="round" />
    </>
  ),
}

const MENUS = [
  {
    key: 'admin',
    title: '관리자 화면',
    desc: '생산 대시보드',
    detail: '라인 · 로트 · 설비 · 불량 현황을 한 화면에서 모니터링합니다.',
  },
  {
    key: 'worker',
    title: '작업자 화면',
    desc: '생산실적관리',
    detail: '작업 시작/종료와 양품 · 불량 실적을 설비 앞에서 등록합니다.',
  },
]

/** 메인 — 관리자/작업자 중 사용할 화면을 고르는 진입 화면. */
export default function Home({ onSelect }) {
  const now = useNow()

  return (
    <div className="home">
      <header className="home__head">
        <img className="home__logo" src="/logo-i3system.png" alt="i3system 아이쓰리시스템(주)" />
        <h1 className="home__title">i3system MES</h1>
        <p className="home__sub">사용할 화면을 선택하세요</p>
        <p className="home__clock num">
          {formatDate(now)} ({WEEKDAY[now.getDay()]}) {formatTime(now)}
        </p>
      </header>

      <div className="home__menu">
        {MENUS.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`hcard hcard--${m.key}`}
            onClick={() => onSelect(m.key)}
          >
            <span className="hcard__icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                {ICONS[m.key]}
              </svg>
            </span>
            <span className="hcard__title">{m.title}</span>
            <span className="hcard__desc">{m.desc}</span>
            <span className="hcard__detail">{m.detail}</span>
          </button>
        ))}
      </div>

      <footer className="home__foot">i3system MES</footer>
    </div>
  )
}
