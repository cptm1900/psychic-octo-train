import './DefectPanel.css'
import { fmtInt, fmtPct } from '../utils/format'

/**
 * 금일 불량 유형 — 순위를 읽는 가로 막대(단일 계열).
 * 값은 막대 끝에 직접 라벨로 붙고, 축 없이도 순위가 읽힌다.
 */
export default function DefectPanel({ items }) {
  const total = items.reduce((s, d) => s + d.count, 0)
  const max = Math.max(...items.map((d) => d.count))

  return (
    <section className="card defect">
      <div className="card__head">
        <div>
          <h2 className="card__title">금일 불량 유형</h2>
          <p className="card__sub">총 {fmtInt(total)}건</p>
        </div>
      </div>

      <ul className="defect__list">
        {items.map((d, i) => (
          <li className="defect__row" key={d.name}>
            <span className="defect__name">{d.name}</span>
            <span className="defect__track">
              <span
                className={`defect__bar${i === 0 ? ' is-top' : ''}`}
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </span>
            <span className="defect__value num">
              {fmtInt(d.count)}
              <small>{fmtPct((d.count / total) * 100, 0)}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
