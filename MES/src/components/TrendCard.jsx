import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import './TrendCard.css'
import { palette } from '../charts/chartSetup'
import { fmtInt, fmtPct } from '../utils/format'

/**
 * 전체 물량 추이 — 구간별 실적 막대 + 구간마다 따로 잡힌 목표 점선.
 * 목표가 구간별로 달라지므로 기준선 하나 대신 계단형 라인으로 그린다.
 */
export default function TrendCard({ title, period, data }) {
  const achieved = data.filter((d) => d.done >= d.target).length

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.label),
      datasets: [
        {
          type: 'line',
          label: '목표',
          data: data.map((d) => d.target),
          borderColor: palette.text2(),
          borderWidth: 1.6,
          borderDash: [4, 3],
          stepped: 'middle',
          pointRadius: 0,
          pointHoverRadius: 0,
          order: 0,
        },
        {
          type: 'bar',
          label: '실적',
          data: data.map((d) => d.done),
          backgroundColor: data.map((d) =>
            d.done >= d.target ? palette.good() : palette.warning(),
          ),
          borderRadius: 4,
          borderSkipped: 'bottom',
          maxBarThickness: 26,
          order: 1,
        },
      ],
    }),
    [data],
  )

  const options = useMemo(
    () => ({
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          grid: { display: false },
          border: { color: palette.borderStrong() },
          ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 10, font: { size: 10 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: palette.border() },
          border: { display: false },
          ticks: { maxTicksLimit: 4, font: { size: 10 }, callback: (v) => fmtInt(v) },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label} ${fmtInt(ctx.parsed.y)}`,
            afterBody: (items) => {
              const d = data[items[0].dataIndex]
              return `달성 ${fmtPct((d.done / d.target) * 100, 0)}`
            },
          },
        },
      },
    }),
    [data],
  )

  return (
    <figure className="trend card">
      <figcaption className="card__head trend__head">
        <div>
          <h3 className="card__title">{title}</h3>
          <p className="card__sub">
            {period} · 목표 달성 {achieved}/{data.length}
          </p>
        </div>
        <p className="trend__legend">
          <span className="trend__legend-item">
            <i className="trend__swatch trend__swatch--met" />
            달성
          </span>
          <span className="trend__legend-item">
            <i className="trend__swatch trend__swatch--short" />
            미달
          </span>
          <span className="trend__legend-item">
            <i className="trend__swatch trend__swatch--goal" />
            목표
          </span>
        </p>
      </figcaption>

      <div className="trend__plot">
        <Bar data={chartData} options={options} aria-label={`${title} · ${period} 실적과 목표`} />
      </div>
    </figure>
  )
}
