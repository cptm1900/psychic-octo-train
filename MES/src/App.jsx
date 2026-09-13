import { useEffect, useMemo, useState } from 'react'
import './App.css'

import TopBar from './components/TopBar'
import SummaryBar from './components/SummaryBar'
import LineCard from './components/LineCard'
import LotTable from './components/LotTable'
import DailyTrendCard from './components/DailyTrendCard'
import EquipmentPanel from './components/EquipmentPanel'
import DefectPanel from './components/DefectPanel'

import { lines as seedLines, lots as seedLots, dailyTrend, equipment, defectTypes } from './data/mockData'
import { useNow } from './hooks/useNow'

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

export default function App() {
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
      produced: dailyTrend.L1.map((d, i) => d.done + dailyTrend.L2[i].done + dailyTrend.L3[i].done),
      yield: dailyTrend.L1.map((d, i) => 97 + ((i * 7) % 5) * 0.4),
    }),
    [],
  )

  return (
    <div className="app">
      <TopBar />

      <SummaryBar lines={lines} trend={trend} />

      <section className="app__lines" aria-label="라인별 현재 로트 상태">
        {lines.map((line) => (
          <LineCard key={line.id} line={line} now={now} />
        ))}
      </section>

      <section className="app__lower">
        <LotTable lots={lots} />
        <div className="app__side">
          <EquipmentPanel lines={lines} equipment={equipment} />
          <DefectPanel items={defectTypes} />
        </div>
      </section>

      <section className="app__trends" aria-label="라인별 일간 생산 추이">
        {lines.map((line) => (
          <DailyTrendCard key={line.id} line={line} data={dailyTrend[line.id]} />
        ))}
      </section>

      <footer className="app__foot">
        <span>i3system MES · 생산 대시보드 (데모 목업 데이터)</span>
        <span className="num">데이터 갱신 주기 4초</span>
      </footer>
    </div>
  )
}
