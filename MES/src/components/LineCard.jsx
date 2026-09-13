import './LineCard.css'
import Meter from './Meter'
import RingGauge from './RingGauge'
import StatusChip from './StatusChip'
import { LINE_STATUS } from '../data/mockData'
import { fmtInt, fmtPct, clamp } from '../utils/format'

const parse = (s) => new Date(s.replace(' ', 'T'))
const hhmm = (s) => s.slice(11, 16)

/** 불량률에 따른 심각도 — 색만으로 의미를 전달하지 않도록 라벨과 함께 쓴다. */
function defectTone(rate) {
  if (rate >= 5) return 'critical'
  if (rate >= 3) return 'warning'
  return 'brand'
}

export default function LineCard({ line, now }) {
  const { name, kind, process, status, lotId, product, spec, target, produced, defect, startAt, endAt } =
    line

  const completion = target > 0 ? (produced / target) * 100 : 0
  const defectRate = produced > 0 ? (defect / produced) * 100 : 0
  const remain = Math.max(target - produced, 0)

  const start = parse(startAt)
  const end = parse(endAt)
  const elapsedRatio = clamp(((now - start) / (end - start)) * 100)
  const elapsedH = Math.max((now - start) / 3_600_000, 0)
  const uph = elapsedH > 0.05 ? produced / elapsedH : 0
  const paceGap = completion - elapsedRatio // 계획(시간) 대비 진척 차이

  const ringTone = status === 'down' ? 'critical' : paceGap < -10 ? 'warning' : 'brand'

  return (
    <article className={`line-card${status === 'run' ? ' is-running' : ''}`}>
      <header className="line-card__head">
        <div className="line-card__id">
          <h2 className="line-card__name">
            {name}
            <span className="line-card__kind">{kind}</span>
          </h2>
          <p className="line-card__process">{process}</p>
        </div>
        <StatusChip tone={LINE_STATUS[status].tone} label={LINE_STATUS[status].label} />
      </header>

      <div className="line-card__body">
        <div className="line-card__gauge">
          <RingGauge value={completion} caption="생산완료율" tone={ringTone} />
          <p className={`pace${paceGap < -10 ? ' pace--behind' : paceGap > 5 ? ' pace--ahead' : ''}`}>
            계획 대비 {paceGap >= 0 ? '+' : ''}
            {paceGap.toFixed(1)}%p
          </p>
        </div>

        <div className="line-card__meters">
          <Meter
            label="생산개수"
            value={produced}
            max={target}
            display={fmtInt(produced)}
            unit={`/ ${fmtInt(target)}`}
            hint={`목표 ${fmtInt(target)} EA 중 ${fmtInt(produced)} EA 완료`}
          />
          <Meter
            label="불량개수"
            value={defectRate}
            max={10}
            tone={defectTone(defectRate)}
            display={fmtInt(defect)}
            unit={`(${fmtPct(defectRate)})`}
            hint={`불량률 ${fmtPct(defectRate)} · 관리한계 3%`}
          />
          <Meter
            label="잔여수량"
            value={remain}
            max={target}
            tone="muted"
            display={fmtInt(remain)}
            unit="EA"
            hint={`잔여 ${fmtInt(remain)} EA`}
          />
          <Meter
            label="시간경과"
            value={elapsedRatio}
            max={100}
            tone="muted"
            display={fmtPct(elapsedRatio, 0)}
            hint={`${hhmm(startAt)} ~ ${hhmm(endAt)}`}
          />
        </div>
      </div>

      <footer className="line-card__foot">
        <dl>
          <div>
            <dt>로트 ID</dt>
            <dd className="num">{lotId}</dd>
          </div>
          <div>
            <dt>생산품목</dt>
            <dd title={spec}>
              {product}
              <span className="line-card__spec">{spec}</span>
            </dd>
          </div>
          <div>
            <dt>작업시간</dt>
            <dd className="num">
              {hhmm(startAt)} – {hhmm(endAt)}
            </dd>
          </div>
          <div>
            <dt>시간당 생산</dt>
            <dd className="num">{fmtInt(uph)} EA/h</dd>
          </div>
        </dl>
      </footer>
    </article>
  )
}
