/**
 * 작업자 화면(생산실적관리) 목업 데이터.
 * 실제 연동 시 이 모듈만 작업지시 조회 API로 교체하면 된다.
 */

/** 현재 설비에 내려온 작업지시 1건 */
export const workOrder = {
  productId: 'ABCD12345',
  orderNo: '20260901DG-DSG',
  lotId: 'ABCD1234',
  partNo: 'DLKGLKD-DKGLKDLGKLH',
  productName: 'asdfqwer1234',
  spec: 'T2SL MWIR · 1280×1024 · 10㎛',
  processName: '검출기 조립 · 진공 실링',
  equipment: '압축 1호기',
  worker: '홍길동',
  totalQty: 2500,
  producedQty: 2000,
  defectQty: 500,
  barcodeQty: 1224,
  startedAt: '08:00:00',
}

/** 검사치수 수집 규격 — 하한/상한을 벗어난 값은 화면에서 붉게 표시된다. */
export const measureSpec = {
  name: '외경 C',
  lower: 60.5,
  upper: 62.4,
  unit: 'mm',
  collected: 1120,
  sample: 50,
}

/** 최근 수집된 검사치수 (최신순 아님 · 수집 순서) */
export const measurements = [
  52.3, 60.5, 62.4, 60.5, 61.2, 61.8, 60.9, 62.1, 61.4, 60.6,
  63.1, 61.7, 61.0, 60.8, 62.3, 61.9, 60.5, 61.1, 62.0, 61.6,
  59.8, 61.3, 62.2, 60.7, 61.5, 61.2, 62.4, 60.9, 61.8, 61.0,
  62.6, 61.4, 60.6, 61.9, 61.1, 62.2, 60.8, 61.6, 61.3, 61.7,
]
