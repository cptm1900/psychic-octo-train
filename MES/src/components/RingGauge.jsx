import './ui.css'
import { clamp } from '../utils/format'

/** 생산완료율 링 게이지 — 카드당 하나의 요약 수치 */
export default function RingGauge({ value, size = 104, stroke = 10, caption, tone = 'brand' }) {
  const pct = clamp(value)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className={`ring${tone !== 'brand' ? ` ring--${tone}` : ''}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle className="ring__track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
        <circle
          className="ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <div className="ring__center">
        <div className="ring__value num">{pct.toFixed(1)}%</div>
        {caption ? <div className="ring__caption">{caption}</div> : null}
      </div>
    </div>
  )
}
