import './ProductionInfo.css'
import StatusChip from './StatusChip'
import { fmtInt } from '../utils/format'

const STAT_TONES = { total: 'is-total', good: 'is-good', bad: 'is-bad' }

function Field({ label, value }) {
  return (
    <div className="pinfo__field">
      <dt className="pinfo__label">{label}</dt>
      <dd className="pinfo__value num">{value}</dd>
    </div>
  )
}

function Stat({ label, value, tone }) {
  return (
    <div className="pinfo__stat">
      <span className="pinfo__statLabel">{label}</span>
      <strong className={`pinfo__statValue num ${STAT_TONES[tone]}`}>{fmtInt(value)}</strong>
    </div>
  )
}

/**
 * 생산정보 — 작업자 화면의 기준 카드.
 * 좌측은 작업지시 식별 정보, 우측은 한눈에 읽어야 하는 수량 3종.
 */
export default function ProductionInfo({ order, run, status, workDate }) {
  return (
    <section className="card pinfo" aria-label="생산정보">
      <div className="card__head">
        <div className="pinfo__heading">
          <h2 className="card__title">생산정보</h2>
          <StatusChip tone={status.tone} label={status.label} size="sm" />
        </div>
        <span className="pinfo__pid num">제품 ID : {order.productId}</span>
      </div>

      <div className="pinfo__body">
        <dl className="pinfo__fields">
          <Field label="작업일자" value={workDate} />
          <Field label="공정명" value={order.processName} />
          <Field label="로트ID" value={order.lotId} />
        </dl>

        <dl className="pinfo__fields">
          <Field label="제품명" value={order.productName} />
          <Field label="시작시간" value={run.startedAt ?? '--:--:--'} />
          <Field label="종료시간" value={run.endedAt ?? '--:--:--'} />
        </dl>

        <div className="pinfo__stats">
          <Stat label="전체수량" value={order.totalQty} tone="total" />
          <Stat label="생산수량" value={run.produced} tone="good" />
          <Stat label="불량수량" value={run.defect} tone="bad" />
        </div>
      </div>
    </section>
  )
}
