import './ui.css'

/**
 * 상태 칩 — 색상은 보조 채널일 뿐이며, 아이콘과 라벨이 항상 함께 의미를 전달한다.
 * tone: good | warning | serious | critical | info | muted
 */
const ICONS = {
  good: (
    <circle className="chip__pulse" cx="5" cy="5" r="4" fill="currentColor" />
  ),
  info: <circle cx="5" cy="5" r="4" fill="currentColor" />,
  muted: <circle cx="5" cy="5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  warning: <path d="M5 0.6 9.4 8.6H0.6z" fill="currentColor" />,
  serious: <path d="M5 0.6 9.4 8.6H0.6z" fill="currentColor" />,
  critical: (
    <path
      d="M1.2 1.2 8.8 8.8M8.8 1.2 1.2 8.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
}

export default function StatusChip({ tone = 'muted', label, size }) {
  return (
    <span className={`chip chip--${tone}${size === 'sm' ? ' chip--sm' : ''}`}>
      <svg className="chip__icon" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        {ICONS[tone] ?? ICONS.muted}
      </svg>
      {label}
    </span>
  )
}
