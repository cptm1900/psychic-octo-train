export const fmtInt = (n) => Math.round(n).toLocaleString('ko-KR')

export const fmtPct = (n, digits = 1) =>
  `${(Math.round(n * 10 ** digits) / 10 ** digits).toFixed(digits)}%`

export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n))

/** 상단이 둥근 컬럼 path (베이스라인 쪽은 각지게) */
export function roundedTopBar(x, y, w, h, r = 4) {
  const rr = Math.min(r, w / 2, Math.max(h, 0))
  if (h <= 0) return ''
  return [
    `M${x},${y + h}`,
    `V${y + rr}`,
    `Q${x},${y} ${x + rr},${y}`,
    `H${x + w - rr}`,
    `Q${x + w},${y} ${x + w},${y + rr}`,
    `V${y + h}`,
    'Z',
  ].join(' ')
}
