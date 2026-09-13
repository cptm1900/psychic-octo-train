export const lots = [
    { seq: 1, id: 'SMSL-2609-014', line: 'Line 1', product: 'Super MARKOS SL', spec: 'T2SL MWIR 1280×1024 / 10㎛', total: 120, done: 120, defect: 7, status: 'run' },
    { seq: 2, id: 'TEQ2-2609-131', line: 'Line 2', product: 'TE-EQ2 코어', spec: 'LWIR 640×480 / 12㎛', total: 1800, done: 1144, defect: 45, status: 'run' },
    { seq: 3, id: 'IGA1280-2609-007', line: 'Line 3', product: 'InGaAs 1280', spec: 'SWIR 1280×1024 / 10㎛', total: 300, done: 42, defect: 2, status: 'setup' },
    { seq: 4, id: 'SMSL-2609-013', line: 'Line 1', product: 'Super MARKOS SL', spec: 'T2SL MWIR 1280×1024 / 10㎛', total: 120, done: 126, defect: 4, status: 'done' },
    { seq: 5, id: 'TEV2-2609-129', line: 'Line 2', product: 'TE-V2', spec: 'LWIR 640×480 / 17㎛', total: 1800, done: 1788, defect: 51, status: 'done' },
    { seq: 6, id: 'IGA1280-2609-006', line: 'Line 3', product: 'InGaAs 1280', spec: 'SWIR 1280×1024 / 10㎛', total: 300, done: 301, defect: 9, status: 'done' },
    { seq: 7, id: 'MKS-2609-071', line: 'Line 1', product: 'MARKOS', spec: 'T2SL MWIR 640×512 / 15㎛', total: 120, done: 112, defect: 9, status: 'done' },
    { seq: 8, id: 'TEQ2-2609-127', line: 'Line 2', product: 'TE-EQ2 코어', spec: 'LWIR 640×480 / 12㎛', total: 1800, done: 1410, defect: 168, status: 'hold' },
    { seq: 9, id: 'IGA1280-2609-005', line: 'Line 3', product: 'InGaAs 1280', spec: 'SWIR 1280×1024 / 10㎛', total: 300, done: 160, defect: 24, status: 'hold' },
    { seq: 10, id: 'LKSP-2609-042', line: 'Line 1', product: 'LUKAS Pro', spec: 'T2SL LWIR 640×512 / 15㎛', total: 120, done: 121, defect: 3, status: 'done' }
];

export const statusLabel = {
    run: '진행',
    setup: '준비',
    hold: '보류',
    done: '완료'
};

export const equipments = [
    { code: 'FCB', name: '인듐 범프 플립칩 본더', line1: 'ok', line2: 'idle', line3: 'idle' },
    { code: 'WLP', name: '웨이퍼 레벨 진공 패키징(WLVP)', line1: 'ok', line2: 'ok', line3: 'idle' },
    { code: 'HLD', name: '헬륨 리크 테스터', line1: 'ok', line2: 'check', line3: 'ok' },
    { code: 'SCL', name: '스털링 쿨러 조립기', line1: 'ok', line2: 'idle', line3: 'idle' },
    { code: 'NUC', name: '블랙바디 캘리브레이터', line1: 'ok', line2: 'ok', line3: 'ok' },
    { code: 'AOI', name: '결함화소 · NETD 검사기', line1: 'check', line2: 'ok', line3: 'stop' },
]

export const equipLabel = {
    ok: '정상',
    check: '점검요',
    stop: '정지',
    idle: '대기',
}

export const defects = [
    { name: '결함화소 초과', count: 38 },
    { name: '진공도 저하', count: 21 },
    { name: '범프 접합 불량', count: 17 },
    { name: 'NETD 규격 미달', count: 12 },
    { name: '쿨러 진동/소음', count: 7 },
    { name: '윈도우 스크래치', count: 5 },
]

export const dailyTrend = {
    labels: ['09-07', '09-08', '09-09', '09-10', '09-11', '09-12', '09-13'],
    values: [2100, 2250, 2000, 2400, 2150, 2100, 1250],
    target: 2200,
}

export const weeklyTrend = {
    labels: ['07-20', '07-27', '08-03', '08-10', '08-17', '08-24', '08-31', '09-07'],
    values: [10800, 11000, 11200, 12000, 10900, 12300, 12400, 9500],
    target: 11500,
}

export const monthlyTrend = {
    labels: ['10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월'],
    values: [43000, 45000, 44000, 47000, 43500, 48000, 46000, 48500, 46500, 49000, 47000, 33000],
    target: 46000,
}