/**
 * i3system(아이쓰리시스템) 적외선 영상센서 MES 대시보드 목업 데이터.
 *
 * 제품군 · 공정 · 설비 명칭은 i3system 공개 제품 라인업을 기준으로 구성했다.
 *  - 냉각형(Cooled): T2SL / InSb 기반 MWIR · LWIR 검출기 (Super MARKOS, MARKOS, LUKAS, iCE 계열)
 *  - 비냉각형(Uncooled): µ-Bolometer LWIR 검출기 및 TE 시리즈 카메라 코어
 *  - InGaAs(SWIR): 1280×1024 / 10㎛ 검출기
 * 실제 연동 시 이 모듈만 API 호출로 교체하면 된다.
 */

const pad = (n) => String(n).padStart(2, '0')
const stamp = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
  `${pad(d.getHours())}:${pad(d.getMinutes())}:00`

/** 데모가 어느 시각에 열려도 자연스럽도록 근무 시간대를 현재 기준으로 잡는다. */
function shift(startHoursAgo, durationHours) {
  const start = new Date(Date.now() - startHoursAgo * 3_600_000)
  start.setMinutes(0, 0, 0)
  const end = new Date(start.getTime() + durationHours * 3_600_000)
  return { startAt: stamp(start), endAt: stamp(end) }
}

export const LINE_STATUS = {
  run: { label: '가동중', tone: 'good' },
  setup: { label: '준비중', tone: 'warning' },
  down: { label: '정지', tone: 'critical' },
}

export const lines = [
  {
    id: 'L1',
    name: 'Line 1',
    kind: '냉각형 MWIR',
    process: 'In 범프 플립칩 본딩 · 디워 진공 실링',
    status: 'run',
    lotId: 'SMSL-2609-014',
    product: 'Super MARKOS SL',
    spec: 'T2SL MWIR · 1280×1024 · 10㎛',
    target: 120,
    produced: 96,
    defect: 5,
    ...shift(7, 10),
  },
  {
    id: 'L2',
    name: 'Line 2',
    kind: '비냉각형 LWIR',
    process: '웨이퍼 레벨 진공 패키징 · 코어 조립',
    status: 'run',
    lotId: 'TEQ2-2609-131',
    product: 'TE-EQ2 코어',
    spec: 'µ-Bolometer LWIR · 640×480 · 12㎛',
    target: 1800,
    produced: 1105,
    defect: 42,
    ...shift(7, 10),
  },
  {
    id: 'L3',
    name: 'Line 3',
    kind: 'InGaAs SWIR',
    process: '블랙바디 NUC 캘리브레이션 · 결함화소 검사',
    status: 'setup',
    lotId: 'IGA1280-2609-007',
    product: 'InGaAs 1280',
    spec: 'InGaAs SWIR · 1280×1024 · 10㎛',
    target: 300,
    produced: 42,
    defect: 2,
    ...shift(1, 9),
  },
]

/** 최근 7일 라인별 생산 실적 (목표 대비 완료수량) */
export const dailyTrend = {
  L1: [
    { day: '', target: 120, done: 118 },
    { day: '', target: 120, done: 124 },
    { day: '', target: 120, done: 103 },
    { day: '', target: 120, done: 121 },
    { day: '', target: 120, done: 112 },
    { day: '', target: 120, done: 126 },
    { day: '', target: 120, done: 96 },
  ],
  L2: [
    { day: '', target: 1800, done: 1760 },
    { day: '', target: 1800, done: 1648 },
    { day: '', target: 1800, done: 1825 },
    { day: '', target: 1800, done: 1902 },
    { day: '', target: 1800, done: 1410 },
    { day: '', target: 1800, done: 1788 },
    { day: '', target: 1800, done: 1105 },
  ],
  L3: [
    { day: '', target: 300, done: 296 },
    { day: '', target: 300, done: 312 },
    { day: '', target: 300, done: 245 },
    { day: '', target: 300, done: 288 },
    { day: '', target: 300, done: 160 },
    { day: '', target: 300, done: 301 },
    { day: '', target: 300, done: 42 },
  ],
}

/** 일자 라벨도 오늘이 마지막 날이 되도록 맞춘다. */
const dayLabel = (daysAgo) => {
  const d = new Date(Date.now() - daysAgo * 86_400_000)
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
Object.values(dailyTrend).forEach((series) => {
  series.forEach((point, i) => {
    point.day = dayLabel(series.length - 1 - i)
  })
})

export const LOT_STATUS = {
  run: { label: '진행', tone: 'info' },
  setup: { label: '준비', tone: 'warning' },
  done: { label: '완료', tone: 'good' },
  hold: { label: '보류', tone: 'serious' },
}

/** 로트 이력 — [로트ID, 라인, 품목, 규격, 총수량, 완료수량, 불량수량, 상태] */
const rawLots = [
  ['SMSL-2609-014', 'L1', 'Super MARKOS SL', 'T2SL MWIR 1280×1024 / 10㎛', 120, 96, 5, 'run'],
  ['TEQ2-2609-131', 'L2', 'TE-EQ2 코어', 'LWIR 640×480 / 12㎛', 1800, 1105, 42, 'run'],
  ['IGA1280-2609-007', 'L3', 'InGaAs 1280', 'SWIR 1280×1024 / 10㎛', 300, 42, 2, 'setup'],
  ['SMSL-2609-013', 'L1', 'Super MARKOS SL', 'T2SL MWIR 1280×1024 / 10㎛', 120, 126, 4, 'done'],
  ['TEV2-2609-129', 'L2', 'TE-V2', 'LWIR 640×480 / 17㎛', 1800, 1788, 51, 'done'],
  ['IGA1280-2609-006', 'L3', 'InGaAs 1280', 'SWIR 1280×1024 / 10㎛', 300, 301, 9, 'done'],
  ['MKS-2609-071', 'L1', 'MARKOS', 'T2SL MWIR 640×512 / 15㎛', 120, 112, 9, 'done'],
  ['TEQ2-2609-127', 'L2', 'TE-EQ2 코어', 'LWIR 640×480 / 12㎛', 1800, 1410, 168, 'hold'],
  ['IGA1280-2609-005', 'L3', 'InGaAs 1280', 'SWIR 1280×1024 / 10㎛', 300, 160, 24, 'hold'],
  ['LKSP-2609-042', 'L1', 'LUKAS Pro', 'T2SL LWIR 640×512 / 15㎛', 120, 121, 3, 'done'],
  ['TESQ1-2609-124', 'L2', 'TE-SQ1', 'LWIR 384×288 / 12㎛', 1800, 1902, 63, 'done'],
  ['IGA1280-2609-004', 'L3', 'InGaAs 1280', 'SWIR 1280×1024 / 10㎛', 300, 288, 8, 'done'],
  ['ICE640-2609-088', 'L1', 'iCE640', 'InSb MWIR 640×512 / 15㎛', 120, 103, 11, 'done'],
  ['TEEV1-2609-121', 'L2', 'TE-EV1 코어', 'LWIR 384×288 / 17㎛', 1800, 1825, 47, 'done'],
  ['IGA1280-2609-003', 'L3', 'InGaAs 1280', 'SWIR 1280×1024 / 10㎛', 300, 245, 19, 'done'],
]

export const lots = rawLots.map(([id, lineId, product, spec, total, done, defect, status], i) => ({
  seq: i + 1,
  id,
  lineId,
  product,
  spec,
  total,
  done,
  defect,
  status,
}))

/** 설비 상태 (라인 × 설비) */
export const EQUIPMENT_STATUS = {
  normal: { label: '정상', tone: 'good' },
  warning: { label: '점검요', tone: 'warning' },
  stopped: { label: '정지', tone: 'critical' },
  idle: { label: '대기', tone: 'muted' },
}

export const equipment = [
  { code: 'FCB', name: '인듐 범프 플립칩 본더', states: { L1: 'normal', L2: 'idle', L3: 'idle' } },
  { code: 'WLP', name: '웨이퍼 레벨 진공 패키징(WLVP)', states: { L1: 'normal', L2: 'normal', L3: 'idle' } },
  { code: 'HLD', name: '헬륨 리크 테스터', states: { L1: 'normal', L2: 'warning', L3: 'normal' } },
  { code: 'SCL', name: '스털링 쿨러 조립기', states: { L1: 'normal', L2: 'idle', L3: 'idle' } },
  { code: 'NUC', name: '블랙바디 캘리브레이터', states: { L1: 'normal', L2: 'normal', L3: 'normal' } },
  { code: 'AOI', name: '결함화소 · NETD 검사기', states: { L1: 'warning', L2: 'normal', L3: 'stopped' } },
]

/** 금일 불량 유형 (적외선 검출기 공정 기준) */
export const defectTypes = [
  { name: '결함화소 초과', count: 38 },
  { name: '진공도 저하', count: 21 },
  { name: '범프 접합 불량', count: 17 },
  { name: 'NETD 규격 미달', count: 12 },
  { name: '쿨러 진동/소음', count: 7 },
  { name: '윈도우 스크래치', count: 5 },
]
