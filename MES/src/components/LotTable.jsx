import { useMemo, useState } from 'react'
import './LotTable.css'
import StatusChip from './StatusChip'
import { LOT_STATUS } from '../data/mockData'
import { fmtInt, fmtPct, clamp } from '../utils/format'

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'run', label: '진행' },
  { key: 'setup', label: '준비' },
  { key: 'hold', label: '보류' },
  { key: 'done', label: '완료' },
]

const COLUMNS = [
  { key: 'seq', label: '순번', align: 'center', width: 56 },
  { key: 'id', label: '로트 ID', align: 'left' },
  { key: 'lineId', label: '라인', align: 'center', width: 72 },
  { key: 'product', label: '생산품목 · 규격', align: 'left' },
  { key: 'total', label: '총수량', align: 'right', width: 82 },
  { key: 'done', label: '완료수량', align: 'right', width: 90 },
  { key: 'defect', label: '불량수량', align: 'right', width: 90 },
  { key: 'defectRate', label: '불량률', align: 'right', width: 78 },
  { key: 'rate', label: '생산완료율', align: 'left', width: 160 },
  { key: 'status', label: '상태', align: 'center', width: 82 },
]

export default function LotTable({ lots }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: 'seq', dir: 'asc' })

  const rows = useMemo(() => {
    const enriched = lots.map((l) => ({
      ...l,
      rate: l.total > 0 ? (l.done / l.total) * 100 : 0,
      defectRate: l.done > 0 ? (l.defect / l.done) * 100 : 0,
    }))
    const q = query.trim().toLowerCase()
    const filtered = enriched.filter(
      (l) =>
        (filter === 'all' || l.status === filter) &&
        (!q ||
          l.id.toLowerCase().includes(q) ||
          l.product.toLowerCase().includes(q) ||
          l.spec.toLowerCase().includes(q)),
    )
    const dir = sort.dir === 'asc' ? 1 : -1
    return filtered.sort((a, b) => {
      const va = a[sort.key]
      const vb = b[sort.key]
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
      return String(va).localeCompare(String(vb), 'ko') * dir
    })
  }, [lots, filter, query, sort])

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))

  return (
    <section className="card lot">
      <div className="card__head">
        <div>
          <h2 className="card__title">로트 관리</h2>
          <p className="card__sub">조회된 로트 {rows.length}건</p>
        </div>
        <div className="lot__tools">
          <div className="seg" role="group" aria-label="로트 상태 필터">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`seg__btn${filter === f.key ? ' is-active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="search">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="4.6" />
              <path d="m10.6 10.6 3 3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="로트 ID · 품목 · 규격 검색"
              aria-label="로트 검색"
            />
          </label>
        </div>
      </div>

      <div className="lot__scroll scroll-y">
        <table className="lot__table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width, textAlign: c.align }}
                  aria-sort={
                    sort.key === c.key
                      ? sort.dir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  <button type="button" className="lot__sort" onClick={() => toggleSort(c.key)}>
                    {c.label}
                    <span className={`lot__caret${sort.key === c.key ? ' is-active' : ''}`}>
                      {sort.key === c.key && sort.dir === 'desc' ? '▾' : '▴'}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id}>
                <td className="num" style={{ textAlign: 'center' }}>
                  {l.seq}
                </td>
                <td className="lot__idcell num">{l.id}</td>
                <td style={{ textAlign: 'center' }}>{l.lineId.replace('L', 'Line ')}</td>
                <td className="lot__product">
                  {l.product}
                  <span className="lot__spec">{l.spec}</span>
                </td>
                <td className="num" style={{ textAlign: 'right' }}>
                  {fmtInt(l.total)}
                </td>
                <td className="num" style={{ textAlign: 'right' }}>
                  {fmtInt(l.done)}
                </td>
                <td className="num" style={{ textAlign: 'right' }}>
                  {fmtInt(l.defect)}
                </td>
                <td
                  className={`num${
                    l.defectRate >= 5 ? ' is-critical' : l.defectRate >= 3 ? ' is-warning' : ''
                  }`}
                  style={{ textAlign: 'right' }}
                >
                  {fmtPct(l.defectRate)}
                </td>
                <td>
                  <div className="lot__rate">
                    <span className="lot__bar">
                      <span className="lot__bar-fill" style={{ width: `${clamp(l.rate)}%` }} />
                    </span>
                    <span className="num">{fmtPct(l.rate, 0)}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <StatusChip
                    tone={LOT_STATUS[l.status].tone}
                    label={LOT_STATUS[l.status].label}
                    size="sm"
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="lot__empty">
                  조건에 맞는 로트가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
