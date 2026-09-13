import './WorkOrderCard.css'
import Meter from './Meter'
import { fmtInt, fmtPct } from '../utils/format'

function Row({ label, value, wide }) {
  return (
    <div className={`wo__row${wide ? ' wo__row--wide' : ''}`}>
      <dt className="wo__label">{label}</dt>
      <dd className="wo__value num">{value}</dd>
    </div>
  )
}

/** 작업지시 정보 — 설비 앞에서 확인해야 하는 지시 내용과 진행률. */
export default function WorkOrderCard({ order, run }) {
  const done = run.produced + run.defect
  const remain = Math.max(order.totalQty - done, 0)
  const defectRate = done > 0 ? (run.defect / done) * 100 : 0

  return (
    <section className="card wo" aria-label="작업지시 정보">
      <div className="card__head">
        <div>
          <h2 className="card__title">작업지시 정보</h2>
          <p className="card__sub">{order.equipment}</p>
        </div>
        <span className="wo__remain num">
          잔여 <strong>{fmtInt(remain)}</strong> EA
        </span>
      </div>

      <dl className="wo__fields">
        <Row label="작업지시번호" value={order.orderNo} wide />
        <Row label="품번" value={order.partNo} wide />
        <Row label="품명" value={order.productName} />
        <Row label="규격" value={order.spec} />
        <Row label="작업자명" value={order.worker} />
        <Row label="바코드 생산량" value={`${fmtInt(order.barcodeQty)} EA`} />
      </dl>

      <div className="wo__meters">
        <Meter
          label="진행률"
          value={done}
          max={order.totalQty}
          display={fmtPct((done / order.totalQty) * 100)}
        />
        <Meter
          label="불량률"
          value={run.defect}
          max={Math.max(done, 1)}
          display={fmtPct(defectRate)}
          tone={defectRate >= 10 ? 'critical' : defectRate >= 5 ? 'warning' : 'muted'}
        />
      </div>
    </section>
  )
}
