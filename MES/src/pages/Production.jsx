import { useMemo, useRef, useState } from 'react'
import './Production.css'

import TopBar from '../components/TopBar'
import ProductionInfo from '../components/ProductionInfo'
import WorkOrderCard from '../components/WorkOrderCard'
import MeasurePanel from '../components/MeasurePanel'
import ActionPanel from '../components/ActionPanel'
import WorkLog from '../components/WorkLog'

import { workOrder as order, measureSpec, measurements } from '../data/productionData'
import { formatDate, formatTime, WEEKDAY } from '../hooks/useNow'
import { fmtInt } from '../utils/format'

const RUN_STATUS = {
  ready: { label: '작업 대기', tone: 'muted' },
  running: { label: '작업중', tone: 'good' },
  done: { label: '작업 종료', tone: 'info' },
  closed: { label: '공정 마감', tone: 'serious' },
}

/** 한 번의 터치로 등록되는 수량 */
const STEP = 1

/** 작업자 화면 — 설비 앞에서 실적을 등록하는 생산실적관리. */
export default function Production({ onHome, onAdmin }) {
  const [run, setRun] = useState(() => ({
    state: 'running',
    startedAt: order.startedAt,
    endedAt: null,
    produced: order.producedQty,
    defect: order.defectQty,
  }))
  const [log, setLog] = useState([])
  const seq = useRef(0)

  const workDate = useMemo(() => {
    const d = new Date()
    return `${formatDate(d)} (${WEEKDAY[d.getDay()]})`
  }, [])

  const pushLog = (tag, tone, text) => {
    seq.current += 1
    const entry = { id: seq.current, time: formatTime(new Date()), tag, tone, text }
    setLog((prev) => [entry, ...prev].slice(0, 50))
  }

  const registered = run.produced + run.defect
  const remain = Math.max(order.totalQty - registered, 0)
  const isRunning = run.state === 'running'
  const canRegister = isRunning && remain > 0

  const startWork = () => {
    const at = formatTime(new Date())
    setRun((prev) => ({ ...prev, state: 'running', startedAt: at, endedAt: null }))
    pushLog('시작', 'good', `${order.orderNo} 작업을 시작했습니다.`)
  }

  const endWork = () => {
    const at = formatTime(new Date())
    setRun((prev) => ({ ...prev, state: 'done', endedAt: at }))
    pushLog('종료', 'info', `작업을 종료했습니다. (생산 ${fmtInt(run.produced)} · 불량 ${fmtInt(run.defect)})`)
  }

  const register = (kind) => {
    const step = Math.min(STEP, remain)
    if (step <= 0) return
    setRun((prev) =>
      kind === 'good'
        ? { ...prev, produced: prev.produced + step }
        : { ...prev, defect: prev.defect + step },
    )
    pushLog(
      kind === 'good' ? '양품' : '불량',
      kind === 'good' ? 'good' : 'critical',
      `${kind === 'good' ? '양품' : '불량'} ${step} EA를 등록했습니다. (잔여 ${fmtInt(remain - step)} EA)`,
    )
  }

  const closeProcess = () => {
    if (run.state !== 'done') {
      pushLog('안내', 'warning', '작업 종료 후에 공정을 마감할 수 있습니다.')
      return
    }
    setRun((prev) => ({ ...prev, state: 'closed' }))
    pushLog('마감', 'serious', `${order.lotId} 로트의 공정을 마감했습니다.`)
  }

  /** 아직 연동되지 않은 보조 기능은 이력으로만 안내한다. */
  const notReady = (name) => pushLog('안내', 'muted', `${name} 기능은 준비 중입니다.`)

  const status = RUN_STATUS[run.state]

  return (
    <div className="page">
      <TopBar
        title="생산실적관리"
        subtitle={`${order.equipment} · ${order.processName}`}
        worker={order.worker}
        onHome={onHome}
      />

      <ProductionInfo order={order} run={run} status={status} workDate={workDate} />

      <section className="prod__main">
        <div className="prod__left">
          <WorkOrderCard order={order} run={run} />
          <MeasurePanel spec={measureSpec} values={measurements} />
          <WorkLog entries={log} />
        </div>

        <div className="prod__right">
          <ActionPanel
            title="작업 패널"
            sub={status.label}
            actions={[
              {
                key: 'start',
                label: '작업 시작',
                tone: 'warning',
                onClick: startWork,
                disabled: isRunning || run.state === 'closed',
              },
              {
                key: 'end',
                label: '작업 종료',
                tone: 'brand',
                onClick: endWork,
                disabled: !isRunning,
              },
            ]}
          />

          <ActionPanel
            title="등록 패널"
            sub={`잔여 ${fmtInt(remain)} EA`}
            actions={[
              {
                key: 'good',
                label: '양품 등록',
                tone: 'good',
                hint: `+${STEP} EA`,
                onClick: () => register('good'),
                disabled: !canRegister,
              },
              {
                key: 'defect',
                label: '불량 등록',
                tone: 'critical',
                hint: `+${STEP} EA`,
                onClick: () => register('defect'),
                disabled: !canRegister,
              },
            ]}
          />

          <ActionPanel
            title="기능 패널"
            size="sm"
            actions={[
              { key: 'code', label: '코드검색 / 등록', onClick: () => notReady('코드검색/등록') },
              { key: 'product', label: '제품 / 생산정보', onClick: () => notReady('제품/생산정보') },
              { key: 'barcode', label: '바코드 출력', onClick: () => notReady('바코드 출력') },
              { key: 'worker', label: '작업자 정보', onClick: () => notReady('작업자 정보') },
              { key: 'close', label: '공정 마감', tone: 'warning', onClick: closeProcess },
              { key: 'admin', label: '관리자 화면', tone: 'brand', onClick: onAdmin },
            ]}
          />
        </div>
      </section>

      <footer className="page__foot">
        <span>i3system MES · 생산실적관리</span>
        <span className="num">
          작업지시 {order.orderNo} · 등록 {fmtInt(registered)} / {fmtInt(order.totalQty)} EA
        </span>
      </footer>
    </div>
  )
}
