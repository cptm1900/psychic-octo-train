import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import './ui.css'
import { palette, token } from '../charts/chartSetup'
import { clamp } from '../utils/format'

const FILL = {
  brand: () => palette.brand(),
  warning: () => palette.warning(),
  critical: () => palette.critical(),
}

const TRACK = {
  brand: () => palette.track(),
  warning: () => token('--warning-soft', '#fdf0d6'),
  critical: () => token('--critical-soft', '#f7dede'),
}

/** 생산완료율 링 게이지 — 카드당 하나의 요약 수치 */
export default function RingGauge({ value, size = 104, stroke = 10, caption, tone = 'brand' }) {
  const pct = clamp(value)

  const data = useMemo(
    () => ({
      labels: ['달성', '잔여'],
      datasets: [
        {
          data: [pct, 100 - pct],
          backgroundColor: [FILL[tone](), TRACK[tone]()],
          borderWidth: 0,
          borderRadius: (ctx) => (ctx.dataIndex === 0 && pct > 2 ? stroke / 2 : 0),
        },
      ],
    }),
    [pct, tone, stroke],
  )

  const options = useMemo(
    () => ({
      responsive: true,
      cutout: size / 2 - stroke,
      events: [],
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }),
    [size, stroke],
  )

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <Doughnut data={data} options={options} aria-label={`${caption ?? '달성률'} ${pct.toFixed(1)}%`} />
      <div className="ring__center">
        <div className="ring__value num">{pct.toFixed(1)}%</div>
        {caption ? <div className="ring__caption">{caption}</div> : null}
      </div>
    </div>
  )
}
