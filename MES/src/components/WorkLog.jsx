import './WorkLog.css'
import StatusChip from './StatusChip'

/** 작업 이력 — 버튼 조작 결과를 작업자가 되짚어 볼 수 있게 남긴다. */
export default function WorkLog({ entries }) {
  return (
    <section className="card wlog" aria-label="작업 이력">
      <div className="card__head">
        <h2 className="card__title">작업 이력</h2>
        <span className="card__sub num">최근 {entries.length}건</span>
      </div>

      <ul className="wlog__list scroll-y" aria-live="polite">
        {entries.length === 0 ? (
          <li className="wlog__empty">아직 등록된 이력이 없습니다.</li>
        ) : (
          entries.map((e) => (
            <li className="wlog__row" key={e.id}>
              <span className="wlog__time num">{e.time}</span>
              <StatusChip tone={e.tone} label={e.tag} size="sm" />
              <span className="wlog__text">{e.text}</span>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
