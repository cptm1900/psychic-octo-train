import { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'

import TopBar from '../components/TopBar'
import SummaryBar from '../components/SummaryBar'
import LineCard from '../components/LineCard'
import LotTable from '../components/LotTable'
import TrendCard from '../components/TrendCard'
import EquipmentPanel from '../components/EquipmentPanel'
import DefectPanel from '../components/DefectPanel'

import { lines as seedLines, lots as seedLots, totalTrend, equipment, defectTypes } from '../data/mockData'
import { useNow } from '../hooks/useNow'

/** 실 데이터 연동 전, 가동 라인의 실적이 조금씩 오르는 것을 흉내낸다. */
function useLiveLines(seed, intervalMs = 4000) {
  const [lines, setLines] = useState(seed)

  useEffect(() => {
    const id = setInterval(() => {
      setLines((prev) =>
        prev.map((l) => {
          if (l.status !== 'run' || l.produced >= l.target) return l
          const add = 2 + Math.floor(Math.random() * 9)
          const produced = Math.min(l.produced + add, l.target)
          const defect = l.defect + (Math.random() < 0.35 ? 1 : 0)
          return { ...l, produced, defect }
        }),
      )
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return lines
}

/** 관리자 화면 — 라인·로트·설비를 한 화면에서 보는 생산 대시보드. */
export default function Dashboard({ onHome }) {
  const now = useNow()
  const lines = useLiveLines(seedLines)

  /** 진행 중인 로트는 라인의 실시간 실적을 따라간다. */
  const lots = useMemo(() => {
    const byLot = Object.fromEntries(lines.map((l) => [l.lotId, l]))
    return seedLots.map((lot) => {
      const live = byLot[lot.id]
      return live ? { ...lot, done: live.produced, defect: live.defect } : lot
    })
  }, [lines])

  const trend = useMemo(
    () => ({
      produced: totalTrend.daily.map((d) => d.done),
      yield: totalTrend.daily.map((_, i) => 97 + ((i * 7) % 5) * 0.4),
    }),
    [],
  )

  return (
    <div className="page">
      <TopBar
        title="생산 대시보드"
        subtitle="적외선 영상센서 · 검출기 조립/검사 공정"
        onHome={onHome}
      />

      <SummaryBar lines={lines} trend={trend} />

      <section className="dash__lines" aria-label="라인별 현재 로트 상태">
        {lines.map((line) => (
          <LineCard key={line.id} line={line} now={now} />
        ))}
      </section>

      <section className="dash__lower">
        <LotTable lots={lots} />
        <div className="dash__side">
          <EquipmentPanel lines={lines} equipment={equipment} />
          <DefectPanel items={defectTypes} />
        </div>
      </section>

      <section className="dash__trends" aria-label="전체 물량 생산 추이">
        <TrendCard title="일간 추이" period="최근 7일" data={totalTrend.daily} />
        <TrendCard title="주간 추이" period="최근 8주 · 주 시작일" data={totalTrend.weekly} />
        <TrendCard title="월간 추이" period="최근 12개월" data={totalTrend.monthly} />
      </section>

      <footer className="page__foot">
        <span>i3system MES · 생산 대시보드</span>
        <span className="num">데이터 갱신 주기 4초</span>
      </footer>
    </div>
  )
}
