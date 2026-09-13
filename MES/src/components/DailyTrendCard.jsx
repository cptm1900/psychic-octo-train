import { useState } from 'react'
import './DailyTrendCard.css'
import { fmtInt, fmtPct, roundedTopBar } from '../utils/format'

const W = 300
const H = 150
const PAD = { top: 16, right: 10, bottom: 22, left: 34 }
const PLOT_W = W - PAD.left - PAD.right
const PLOT_H = H - PAD.top - PAD.bottom
const MAX_BAR = 24
const GAP = 2 // 인접 막대를 갈라 놓는 서피스 간격

/** 축 눈금용 라운딩 */
function niceMax(v) {
  const step = 10 ** Math.floor(Math.log10(v)) / 2
  return Math.ceil(v / step) * step
}

/**
 * 라인별 일간 생산 추이 — 완료수량 컬럼 1개 시리즈 + 목표 기준선.
 * 시리즈가 하나라 범례 대신 제목이 무엇을 그렸는지 말한다.
 */
export default function DailyTrendCard({ line, data }) {
  const [hover, setHover] = useState(null)

  const target = data[0]?.target ?? 0
  const max = niceMax(Math.max(target, ...data.map((d) => d.done)) * 1.1)
  const band = PLOT_W / data.length
  const barW = Math.min(MAX_BAR, band - GAP * 2)
  const y = (v) => PAD.top + PLOT_H - (v / max) * PLOT_H
  const targetY = y(target)

  const achieved = data.filter((d) => d.done >= d.target).length
  const todayIdx = data.length - 1
  const active = hover ?? todayIdx

  return (
    <figure className="trend card">
      <figcaption className="card__head trend__head">
        <div>
          <h3 className="card__title">{line.name} 일간 추이</h3>
          <p className="card__sub">최근 7일 완료수량 · 목표 달성 {achieved}일</p>
        </div>
      </figcaption>

      <div className="trend__plot">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${line.name} 최근 7일 완료수량 추이`}>
          {/* 눈금선 — 표면에서 한 단계 벗어난 회색, 1px 실선 */}
          {[0, 0.5, 1].map((t) => {
            const gy = PAD.top + PLOT_H * (1 - t)
            return (
              <g key={t}>
                <line className="trend__grid" x1={PAD.left} x2={W - PAD.right} y1={gy} y2={gy} />
                <text className="trend__tick" x={PAD.left - 6} y={gy + 3.5} textAnchor="end">
                  {fmtInt(max * t)}
                </text>
              </g>
            )
          })}

          {/* 목표 기준선 */}
          <line
            className="trend__target"
            x1={PAD.left}
            x2={W - PAD.right}
            y1={targetY}
            y2={targetY}
          />
          <text className="trend__target-label" x={W - PAD.right} y={targetY - 4} textAnchor="end">
            목표 {fmtInt(target)}
          </text>

          {/* 컬럼 */}
          {data.map((d, i) => {
            const cx = PAD.left + band * i + band / 2
            const x = cx - barW / 2
            const top = y(d.done)
            const isActive = i === active
            return (
              <g
                key={d.day}
                className={`trend__col${isActive ? ' is-active' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${d.day} 완료 ${fmtInt(d.done)}개, 목표 ${fmtInt(d.target)}개`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
              >
                {/* 히트 영역 — 막대보다 넓게 */}
                <rect x={PAD.left + band * i} y={PAD.top} width={band} height={PLOT_H} fill="transparent" />
                <path
                  className={`trend__bar${d.done < d.target ? ' is-short' : ''}`}
                  d={roundedTopBar(x, top, barW, PAD.top + PLOT_H - top, 4)}
                />
                <text className="trend__xlabel" x={cx} y={H - 6} textAnchor="middle">
                  {d.day}
                </text>
              </g>
            )
          })}

          {/* 베이스라인 */}
          <line
            className="trend__axis"
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + PLOT_H}
            y2={PAD.top + PLOT_H}
          />
        </svg>

        {/* 호버 툴팁 */}
        {hover != null && (
          <div
            className="trend__tip"
            style={{
              left: `${((PAD.left + band * hover + band / 2) / W) * 100}%`,
              top: `${(y(data[hover].done) / H) * 100}%`,
            }}
          >
            <strong>{data[hover].day}</strong>
            <span className="num">완료 {fmtInt(data[hover].done)}</span>
            <span className="num">
              달성 {fmtPct((data[hover].done / data[hover].target) * 100, 0)}
            </span>
          </div>
        )}
      </div>
    </figure>
  )
}
