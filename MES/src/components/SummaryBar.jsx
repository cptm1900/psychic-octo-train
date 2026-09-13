import { Line } from 'react-chartjs-2'
import './SummaryBar.css'
import { palette } from '../charts/chartSetup'
import { fmtInt, fmtPct } from '../utils/format'

/** 스파크라인 — 축 없이 추세만 보여주고, 값은 타일의 숫자가 말한다. */
function Sparkline({ points }) {
  if (!points?.length) return null

  const last = points.length - 1
  const data = {
    labels: points.map((_, i) => i),
    datasets: [
      {
        data: points,
        borderColor: palette.trackStrong(),
        borderWidth: 2,
        tension: 0.35,
        pointRadius: (ctx) => (ctx.dataIndex === last ? 3.5 : 0),
        pointBackgroundColor: palette.brand(),
        pointBorderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    events: [],
    layout: { padding: 4 },
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  }

  return (
    <div className="spark" aria-hidden="true">
      <Line data={data} options={options} />
    </div>
  )
}

function Tile({ label, value, unit, delta, deltaGood, trend }) {
  const dir = delta == null ? null : delta >= 0 ? 'up' : 'down'
  const tone = dir == null ? '' : (dir === 'up') === deltaGood ? ' is-good' : ' is-bad'
  return (
    <div className="tile">
      <div className="tile__body">
        <span className="tile__label">{label}</span>
        <span className="tile__value num">
          {value}
          {unit ? <small>{unit}</small> : null}
        </span>
        {delta != null && (
          <span className={`tile__delta${tone}`}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path
                d={dir === 'up' ? 'M5 1.5 9 8H1z' : 'M5 8.5 1 2h8z'}
                fill="currentColor"
              />
            </svg>
            {Math.abs(delta).toFixed(1)}%p
            <em>전일 대비</em>
          </span>
        )}
      </div>
      {trend ? <Sparkline points={trend} /> : null}
    </div>
  )
}

export default function SummaryBar({ lines, trend }) {
  const target = lines.reduce((s, l) => s + l.target, 0)
  const produced = lines.reduce((s, l) => s + l.produced, 0)
  const defect = lines.reduce((s, l) => s + l.defect, 0)
  const good = produced - defect
  const running = lines.filter((l) => l.status === 'run').length

  return (
    <section className="summary" aria-label="금일 생산 요약">
      <Tile
        label="금일 총 생산"
        value={fmtInt(produced)}
        unit="EA"
        trend={trend?.produced}
      />
      <Tile
        label="목표 달성률"
        value={fmtPct((produced / target) * 100)}
        delta={2.4}
        deltaGood
      />
      <Tile
        label="양품률"
        value={fmtPct((good / Math.max(produced, 1)) * 100)}
        delta={-0.8}
        deltaGood
        trend={trend?.yield}
      />
      <Tile label="가동 라인" value={`${running} / ${lines.length}`} unit="LINE" />
      <Tile label="금일 불량" value={fmtInt(defect)} unit="EA" delta={1.1} deltaGood={false} />
    </section>
  )
}
