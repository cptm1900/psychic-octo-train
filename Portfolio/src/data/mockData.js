export const lots = [
    { seq: 1, id: 'SMKS-2609-014', line: 'Line 1', product: 'Super MARKOS', spec: 'T2SL MW 1280×1024 (10㎛)', total: 120, done: 120, defect: 7, status: 'run' },
    { seq: 2, id: 'LKS-2609-131', line: 'Line 2', product: 'LUKAS', spec: 'T2SL LW 640×512 (15㎛)', total: 1800, done: 1144, defect: 45, status: 'run' },
    { seq: 3, id: 'TEQ1-2609-007', line: 'Line 3', product: 'TE-EQ1', spec: '비냉각형 검출기', total: 300, done: 42, defect: 2, status: 'setup' },
    { seq: 4, id: 'SMKS-2609-013', line: 'Line 1', product: 'Super MARKOS', spec: 'T2SL MW 1280×1024 (10㎛)', total: 120, done: 118, defect: 4, status: 'done' },
    { seq: 5, id: 'LKS-2609-129', line: 'Line 2', product: 'LUKAS', spec: 'T2SL LW 640×512 (15㎛)', total: 1800, done: 1788, defect: 51, status: 'done' },
    { seq: 6, id: 'TE-EV1', line: 'Line 3', product: 'TE-EV1', spec: 'InSb MW 640×512 (15㎛)', total: 300, done: 300, defect: 9, status: 'done' },
    { seq: 7, id: 'MKS-2609-071', line: 'Line 1', product: 'MARKOS', spec: 'T2SL MW 640×512 (15㎛)', total: 120, done: 112, defect: 9, status: 'done' },
    { seq: 8, id: 'LKS-2609-127', line: 'Line 2', product: 'LUKAS', spec: 'T2SL LW 640×512 (15㎛)', total: 1800, done: 1410, defect: 168, status: 'hold' },
    { seq: 9, id: 'TESQ1-2609-005', line: 'Line 3', product: 'TE-SQ1', spec: '비냉각형 열화상 카메라', total: 300, done: 160, defect: 24, status: 'hold' },
    { seq: 10, id: 'DI320-2609-042', line: 'Line 1', product: 'DI320', spec: 'InSb MW 320×256 (30㎛)', total: 120, done: 120, defect: 3, status: 'done' }
]

export const statusLabel = {
    run: '진행',
    setup: '준비',
    hold: '보류',
    done: '완료'
}

export const equipments = [
    { code: 'ASM', name: '조립기', line1: 'ok', line2: 'idle', line3: 'idle' },
    { code: 'INS', name: '검사기', line1: 'ok', line2: 'ok', line3: 'idle' },
    { code: 'PKG', name: '포장기', line1: 'ok', line2: 'check', line3: 'ok' },
    { code: 'LBL', name: '라벨 프린터', line1: 'ok', line2: 'ok', line3: 'idle' },
    { code: 'SCN', name: '바코드 스캐너', line1: 'ok', line2: 'ok', line3: 'ok' },
    { code: 'CNV', name: '컨베이어', line1: 'check', line2: 'ok', line3: 'stop' }
]

export const equipLabel = {
    ok: '정상',
    check: '점검필요',
    stop: '정지',
    idle: '대기'
}

export const defects = [
    { name: '윈도우 스크래치', count: 18 },
    { name: '외관 손상', count: 13 },
    { name: '밀봉 불량', count: 10 },
    { name: '내부 먼지 유입', count: 7 },
    { name: '부싱 누락', count: 4 },
    { name: '라벨 오부착', count: 2 }
]

export const dailyTrend = {
    labels: ['09-07', '09-08', '09-09', '09-10', '09-11', '09-12', '09-13'],
    values: [2100, 2250, 2000, 2400, 2150, 2100, 1306],
    target: 2200
}

export const weeklyTrend = {
    labels: ['07-20', '07-27', '08-03', '08-10', '08-17', '08-24', '08-31', '09-07'],
    values: [10800, 11000, 11200, 12000, 10900, 12300, 12400, 9500],
    target: 11500
}

export const monthlyTrend = {
    labels: ['10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월'],
    values: [43000, 45000, 44000, 47000, 43500, 48000, 46000, 48500, 46500, 49000, 47000, 33000],
    target: 46000
}