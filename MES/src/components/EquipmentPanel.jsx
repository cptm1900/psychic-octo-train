import './EquipmentPanel.css'
import StatusChip from './StatusChip'
import { EQUIPMENT_STATUS } from '../data/mockData'

/** 설비 상태 매트릭스 — 설비(행) × 라인(열) */
export default function EquipmentPanel({ lines, equipment }) {
  const counts = equipment.reduce((acc, eq) => {
    lines.forEach((l) => {
      const s = eq.states[l.id]
      acc[s] = (acc[s] ?? 0) + 1
    })
    return acc
  }, {})

  const alerts = (counts.stopped ?? 0) + (counts.warning ?? 0)

  return (
    <section className="card equip">
      <div className="card__head">
        <div>
          <h2 className="card__title">설비 상태</h2>
          <p className="card__sub">
            {alerts > 0 ? `조치 필요 ${alerts}건` : '전 설비 정상 가동'}
          </p>
        </div>
        <div className="equip__legend">
          {Object.entries(EQUIPMENT_STATUS).map(([key, s]) => (
            <span key={key} className="equip__legend-item">
              <i className={`dot dot--${s.tone}`} aria-hidden="true" />
              {s.label} {counts[key] ?? 0}
            </span>
          ))}
        </div>
      </div>

      <div className="equip__grid" style={{ '--cols': lines.length }}>
        <div className="equip__row equip__row--head">
          <span className="equip__name">설비</span>
          {lines.map((l) => (
            <span key={l.id} className="equip__cell equip__colhead">
              {l.name}
            </span>
          ))}
        </div>

        {equipment.map((eq) => (
          <div className="equip__row" key={eq.code}>
            <span className="equip__name">
              <code>{eq.code}</code>
              {eq.name}
            </span>
            {lines.map((l) => {
              const state = EQUIPMENT_STATUS[eq.states[l.id]]
              return (
                <span key={l.id} className="equip__cell">
                  <StatusChip tone={state.tone} label={state.label} size="sm" />
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
