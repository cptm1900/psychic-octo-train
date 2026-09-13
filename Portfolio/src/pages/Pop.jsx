import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNow, formatDate, formatTime, weekday } from '../hooks/useNow'
import './Pop.css'

const defectReasons = [
  '윈도우 스크래치',
  '외관 손상',
  '부싱 누락',
  '밀봉 불량',
  '내부 먼지 유입',
  '라벨 오부착',
]

function Pop() {
  const navigate = useNavigate()
  const now = useNow()

  const [lotId, setLotId] = useState('')
  const [itemId, setItemId] = useState('')
  const [working, setWorking] = useState(false)
  const [total] = useState(1800)
  const [good, setGood] = useState(0)
  const [defect, setDefect] = useState(0)
  const [logs, setLogs] = useState([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [customMode, setCustomMode] = useState(false)
  const [customReason, setCustomReason] = useState('')
  const [docModal, setDocModal] = useState(null)

  const lotRef = useRef(null)
  const itemRef = useRef(null)
  const customRef = useRef(null)

  const remain = total - good - defect
  const rows = logs.filter(
    (log) => query === '' || log.itemId.includes(query) || log.lotId.includes(query)
  )

  function notify(text, type) {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 2000)
  }

  function startWork() {
    if (lotId === '' || itemId === '') {
      notify('로트 ID와 품목 ID를 먼저 입력하세요', 'bad')
      return
    }
    setWorking(true)
    notify('작업을 시작했습니다', 'good')
  }

  function endLot() {
    setWorking(false)
    setLotId('')
    setItemId('')
    setGood(0)
    setDefect(0)
    notify('로트를 종료했습니다', 'good')
    setTimeout(() => lotRef.current.focus(), 0)
  }

  function addGood() {
    if (!working) {
      notify('작업을 먼저 시작하세요', 'bad')
      return
    }
    setGood((n) => n + 1)
    setLogs((prev) => [
      { key: Date.now(), type: 'good', lotId, itemId, reason: '-', time: formatTime(new Date()) },
      ...prev,
    ])
    notify('양품 등록 완료', 'good')
    setItemId('')
    setTimeout(() => itemRef.current.focus(), 0)
  }

  function openDefectModal() {
    if (!working) {
      notify('작업을 먼저 시작하세요', 'bad')
      return
    }
    setModalOpen(true)
    setCustomMode(false)
    setCustomReason('')
  }

  function closeModal() {
    setModalOpen(false)
    setCustomMode(false)
    setCustomReason('')
  }

  function registerDefect(text) {
    setDefect((n) => n + 1)
    setLogs((prev) => [
      { key: Date.now(), type: 'bad', lotId, itemId, reason: text, time: formatTime(new Date()) },
      ...prev,
    ])
    notify(`불량 등록 : ${text}`, 'bad')
    closeModal()
    setItemId('')
    setTimeout(() => itemRef.current.focus(), 0)
  }

  function onScanKeyDown(e, isItemField) {
    if (e.key === ' ') {
      e.preventDefault()
      openDefectModal()
      return
    }
    if (e.key !== 'Enter') return

    if (!isItemField) {
      itemRef.current.focus()
      return
    }

    if (working) {
      addGood()
    } else {
      startWork()
      e.target.blur()
    }
  }

  useEffect(() => {
    function handleKey(e) {
      if (docModal) {
        if (e.key === 'Escape') setDocModal(null)
        return
      }

      if (modalOpen) return

      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return

      if (e.key === 'Enter') {
        e.preventDefault()
        if (working) {
          addGood()
        } else {
          startWork()
        }
        return
      }

      if (e.key === ' ') {
        e.preventDefault()
        openDefectModal()
        return
      }

      if (e.key === 'F4') {
        e.preventDefault()
        if (working) endLot()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen, docModal, working, itemId, lotId, good, defect, logs])

  useEffect(() => {
    if (!modalOpen) return

    function handleKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
        return
      }

      if (customMode) {
        if (e.key === 'Enter') {
          e.preventDefault()
          const text = customReason.trim()
          if (text === '') return
          registerDefect(text)
        }
        return
      }

      if (e.key === '0') {
        e.preventDefault()
        setCustomMode(true)
        return
      }

      const num = Number(e.key)
      if (num >= 1 && num <= defectReasons.length) {
        e.preventDefault()
        registerDefect(defectReasons[num - 1])
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen, customMode, customReason, itemId, lotId])

  useEffect(() => {
    if (customMode) {
      customRef.current.focus()
    }
  }, [customMode])

  return (
    <div className="pop">
      <div className="pop_head">
        <div className="pop_logo_wrap">
          <button className="logo_btn" onClick={() => navigate('/')} title="메인 화면으로 이동">
            <img className="pop_logo" src="/i3system_logo.gif" alt="아이쓰리시스템" />
          </button>
        </div>

        <div className="pop_head_center">
          <h1 className="pop_title">생산실적관리</h1>
          <p className="pop_subtitle">Line 2 · 포장</p>
        </div>

        <div className="pop_time">
          <div className="pop_worker">작업자 : 유민우</div>
          <div className="pop_clock">
            {formatDate(now)} ({weekday[now.getDay()]}) {formatTime(now)}
          </div>
        </div>
      </div>

      {message && <div className={`toast ${message.type}`}>{message.text}</div>}

      <div className="pop_body">
        <div className="pop_top">
          <div className="pop_main">
            <div className="scan_card">
              <div className="scan_field">
                <label className="scan_label" htmlFor="lot_input">로트 ID</label>
                <input
                  id="lot_input"
                  ref={lotRef}
                  className="scan_input"
                  type="text"
                  value={lotId}
                  onChange={(e) => setLotId(e.target.value)}
                  onKeyDown={(e) => onScanKeyDown(e, false)}
                  placeholder="바코드 스캔 또는 입력"
                  autoFocus
                />
              </div>
              <div className="scan_field">
                <label className="scan_label" htmlFor="item_input">품목 ID</label>
                <input
                  id="item_input"
                  ref={itemRef}
                  className="scan_input"
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  onKeyDown={(e) => onScanKeyDown(e, true)}
                  placeholder="바코드 스캔 또는 입력"
                />
              </div>
            </div>

            <div className="info_card">
              <div className="info_item">
                <span className="info_key">품목명</span>
                <span className="info_val">Super LUKAS</span>
              </div>
              <div className="info_item">
                <span className="info_key">공정명</span>
                <span className="info_val">포장</span>
              </div>
              <div className="info_item">
                <span className="info_key">작업일자</span>
                <span className="info_val">{formatDate(now)}</span>
              </div>
              <div className="info_item">
                <span className="info_key">시작시간</span>
                <span className="info_val">10:00:00</span>
              </div>
              <div className="info_item">
                <span className="info_key">종료시간</span>
                <span className="info_val">20:00:00</span>
              </div>
            </div>

            <div className="count_card">
              <div className="count_box">
                <span className="count_label">전체수량</span>
                <span className="count_num total">{total.toLocaleString()}</span>
              </div>
              <div className="count_box">
                <span className="count_label">현재수량</span>
                <span className="count_num good">{good.toLocaleString()}</span>
              </div>
              <div className="count_box">
                <span className="count_label">불량수량</span>
                <span className="count_num defect">{defect.toLocaleString()}</span>
              </div>
              <div className="count_box">
                <span className="count_label">잔여수량</span>
                <span className="count_num remain">{remain.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pop_side">
            <div className="panel_card">
              <h2 className="panel_title">작업 패널</h2>
              <div className="panel_btns">
                <button className="big_btn start" onClick={startWork} disabled={working}>
                  작업 시작
                  <small>{working ? '진행 중' : 'Enter'}</small>
                </button>
                <button className="big_btn stop" onClick={endLot} disabled={!working}>
                  로트 종료
                  <small>F4</small>
                </button>
              </div>
            </div>

            <div className="panel_card">
              <h2 className="panel_title">등록 패널</h2>
              <div className="panel_btns">
                <button className="big_btn good" onClick={addGood}>
                  양품 등록
                  <small>Enter</small>
                </button>
                <button className="big_btn bad" onClick={openDefectModal}>
                  불량 등록
                  <small>Space</small>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_row">
          <div className="log_card">
            <div className="log_head">
              <h2 className="panel_title">등록 이력</h2>
              <input
                className="log_search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="로트 ID · 품목 ID 검색"
              />
            </div>

            <div className="log_scroll">
              {rows.length === 0 ? (
                <p className="log_empty">등록된 실적이 없습니다</p>
              ) : (
                <table className="log_table">
                  <thead>
                    <tr>
                      <th>시간</th>
                      <th>구분</th>
                      <th>로트 ID</th>
                      <th>품목 ID</th>
                      <th>사유</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((log) => (
                      <tr key={log.key}>
                        <td>{log.time}</td>
                        <td>
                          <span className={`log_chip ${log.type}`}>
                            {log.type === 'good' ? '양품' : '불량'}
                          </span>
                        </td>
                        <td>{log.lotId}</td>
                        <td>{log.itemId}</td>
                        <td>{log.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="doc_card">
            <div className="doc_btns">
              <button className="doc_btn" onClick={() => setDocModal('order')}>
                <span className="doc_icon">📋</span>
                작업지시서
              </button>
              <button className="doc_btn" onClick={() => setDocModal('notice')}>
                <span className="doc_icon">📢</span>
                공지사항
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal_bg">
          <div className="modal">
            <h2 className="modal_title">불량 사유 선택</h2>
            <p className="modal_help">숫자 키를 누르면 바로 등록됩니다 · ESC 취소</p>

            <div className="reason_list">
              {defectReasons.map((r, i) => (
                <button key={r} className="reason_btn" onClick={() => registerDefect(r)}>
                  <span className="reason_num">{i + 1}</span>
                  <span className="reason_text">{r}</span>
                </button>
              ))}

              <button
                className={customMode ? 'reason_btn on' : 'reason_btn'}
                onClick={() => setCustomMode(true)}
              >
                <span className="reason_num">0</span>
                <span className="reason_text">직접 입력</span>
              </button>
            </div>

            {customMode && (
              <input
                ref={customRef}
                className="custom_input"
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="사유 입력 후 Enter"
              />
            )}
          </div>
        </div>
      )}

      {docModal && (
        <div className="modal_bg" onClick={() => setDocModal(null)}>
          <div className="doc_modal" onClick={(e) => e.stopPropagation()}>
            {docModal === 'order' ? (
              <>
                <h2 className="modal_title">작업지시서</h2>
                <p className="modal_help">ESC 또는 바깥을 클릭하면 닫힙니다</p>

                <table className="doc_table">
                  <tbody>
                    <tr><th>지시번호</th><td>WO-2609-0131</td></tr>
                    <tr><th>로트 ID</th><td>TEQ2-2609-131</td></tr>
                    <tr><th>품목명</th><td>Super LUKAS</td></tr>
                    <tr><th>규격</th><td>T2SL LWIR 1280×1024 / 12㎛</td></tr>
                    <tr><th>지시수량</th><td>1,800 EA</td></tr>
                    <tr><th>공정</th><td>포장</td></tr>
                    <tr><th>작업시간</th><td>10:00 ~ 20:00</td></tr>
                    <tr><th>담당자</th><td>유민우</td></tr>
                  </tbody>
                </table>

                <div className="doc_note">
                  <strong>작업 유의사항</strong>
                  <ul>
                    <li>제전장갑을 반드시 착용하고 광학창 접촉을 피할 것</li>
                    <li>개별 포장 전 방진 클린룸 기준 유지</li>
                    <li>밀봉 후 실링 상태를 육안 확인할 것</li>
                    <li>라벨의 로트 ID와 실물 바코드 일치 여부 확인</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal_title">공지사항</h2>
                <p className="modal_help">ESC 또는 바깥을 클릭하면 닫힙니다</p>

                <div className="notice_list">
                  <div className="notice_item">
                    <div className="notice_head">
                      <span className="notice_tag urgent">긴급</span>
                      <span className="notice_date">2026-09-13</span>
                    </div>
                    <p className="notice_title">Line 2 밀봉기 점검 예정</p>
                    <p className="notice_body">
                      9월 14일 09:00부터 약 2시간 동안 밀봉기 정기 점검이 진행됩니다.
                      해당 시간에는 포장 공정을 중단해 주십시오.
                    </p>
                  </div>

                  <div className="notice_item">
                    <div className="notice_head">
                      <span className="notice_tag">일반</span>
                      <span className="notice_date">2026-09-11</span>
                    </div>
                    <p className="notice_title">불량 코드 체계 변경 안내</p>
                    <p className="notice_body">
                      포장 공정 불량 사유에 라벨 오부착 항목이 추가되었습니다.
                      기존 기타 처리 건은 해당 코드로 등록해 주십시오.
                    </p>
                  </div>

                  <div className="notice_item">
                    <div className="notice_head">
                      <span className="notice_tag">일반</span>
                      <span className="notice_date">2026-09-08</span>
                    </div>
                    <p className="notice_title">클린룸 출입 절차 안내</p>
                    <p className="notice_body">
                      에어샤워 체류 시간을 기존 15초에서 20초로 조정합니다.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Pop