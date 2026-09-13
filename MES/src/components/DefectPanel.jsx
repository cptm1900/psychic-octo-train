import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import './DefectPanel.css'
import { Chart, palette } from '../charts/chartSetup'
import { fmtInt, fmtPct } from '../utils/format'

/** 막대 끝에 건수와 비중을 직접 찍는다. (축 없이도 순위가 읽히도록) */
const valueLabels = {
  id: 'defectValueLabels',
  afterDatasetsDraw(chart) {
    const { ctx } = chart
    const values = chart.data.datasets[0].data
    const total = values.reduce((s, v) => s + v, 0)
    const family = Chart.defaults.font.family

    ctx.save()
    ctx.textBaseline = 'middle'
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const count = fmtInt(values[i])
      ctx.font = `700 12px ${family}`
      ctx.fillStyle = palette.text1()
      ctx.fillText(count, bar.x + 8, bar.y)

      const w = ctx.measureText(count).width
      ctx.font = `500 11px ${family}`
      ctx.fillStyle = palette.text3()
      ctx.fillText(fmtPct((values[i] / total) * 100, 0), bar.x + 13 + w, bar.y)
    })
    ctx.restore()
  },
}

/** 금일 불량 유형 — 건수 내림차순 가로 막대(파레토). */
export default function DefectPanel({ items }) {
  const total = items.reduce((s, d) => s + d.count, 0)

  const data = useMemo(
    () => ({
      labels: items.map((d) => d.name),
      datasets: [
        {
          label: '불량 건수',
          data: items.map((d) => d.count),
          backgroundColor: items.map((_, i) => (i === 0 ? palette.brand() : palette.track())),
          hoverBackgroundColor: items.map((_, i) =>
            i === 0 ? palette.brandStrong() : palette.trackStrong(),
          ),
          borderRadius: 3,
          borderSkipped: false,
          barThickness: 14,
        },
      ],
    }),
    [items],
  )

  const options = useMemo(
    () => ({
      indexAxis: 'y',
      responsive: true,
      layout: { padding: { right: 64 } },
      scales: {
        x: { display: false, beginAtZero: true, grace: '4%' },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            autoSkip: false,
            crossAlign: 'far',
            color: palette.text2(),
            font: { size: 12.5 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${fmtInt(ctx.parsed.x)}건 · 비중 ${fmtPct((ctx.parsed.x / total) * 100, 0)}`,
          },
        },
      },
    }),
    [total],
  )

  return (
    <section className="card defect">
      <div className="card__head">
        <div>
          <h2 className="card__title">금일 불량 유형</h2>
          <p className="card__sub">총 {fmtInt(total)}건</p>
        </div>
      </div>

      <div className="defect__plot" style={{ height: items.length * 30 + 24 }}>
        <Bar data={data} options={options} plugins={[valueLabels]} />
      </div>
    </section>
  )
}
