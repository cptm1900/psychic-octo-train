import './MeasurePanel.css'
import { fmtInt } from '../utils/format'

/**
 * 검사치수 수집항목 — 설비에서 올라온 측정값을 수집 순서대로 보여준다.
 * 규격을 벗어난 값은 색 외에 테두리와 '이탈' 라벨(title)로도 구분된다.
 */
export default function MeasurePanel({ spec, values }) {
  const out = values.filter((v) => v < spec.lower || v > spec.upper)
  const avg = values.reduce((s, v) => s + v, 0) / values.length

  return (
    <section className="card meas" aria-label="검사치수 수집항목">
      <div className="card__head">
        <div>
          <h2 className="card__title">검사치수 수집항목</h2>
          <p className="card__sub num">
            규격 {spec.lower} ≤ {spec.name} ≤ {spec.upper} {spec.unit}
          </p>
        </div>
        <div className="meas__counts num">
          <span className="meas__count">
            수집 <strong>{fmtInt(spec.collected)}</strong> ea
          </span>
          <span className="meas__count">
            샘플 <strong>{fmtInt(spec.sample)}</strong> ea
          </span>
        </div>
      </div>

      <ul className="meas__grid scroll-y">
        {values.map((v, i) => {
          const isOut = v < spec.lower || v > spec.upper
          return (
            <li
              key={`${i}-${v}`}
              className={`meas__cell num${isOut ? ' is-out' : ''}`}
              title={isOut ? `${v} ${spec.unit} · 규격 이탈` : `${v} ${spec.unit}`}
            >
              {v.toFixed(1)}
            </li>
          )
        })}
      </ul>

      <div className="meas__foot num">
        <span>
          평균 <strong>{avg.toFixed(2)}</strong> {spec.unit}
        </span>
        <span className={out.length ? 'is-out' : undefined}>
          규격 이탈 <strong>{out.length}</strong> 건
        </span>
      </div>
    </section>
  )
}
