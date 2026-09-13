import './ui.css'
import { clamp } from '../utils/format'

/**
 * 라벨 · 트랙 · 값이 한 줄로 정렬되는 미터.
 * 트랙은 채움색과 같은 계열의 옅은 단계라 전체 바에서 상태가 읽힌다.
 */
export default function Meter({ label, value, max, display, unit, tone = 'brand', hint }) {
  const ratio = max > 0 ? clamp((value / max) * 100) : 0
  return (
    <div className={`meter${tone !== 'brand' ? ` meter--${tone}` : ''}`}>
      <span className="meter__label">{label}</span>
      <div
        className="meter__track"
        role="meter"
        aria-label={label}
        aria-valuenow={Math.round(ratio)}
        aria-valuemin={0}
        aria-valuemax={100}
        title={hint}
      >
        <span className="meter__fill" style={{ width: `${ratio}%` }} />
      </div>
      <span className="meter__value">
        {display}
        {unit ? <small>{unit}</small> : null}
      </span>
    </div>
  )
}
