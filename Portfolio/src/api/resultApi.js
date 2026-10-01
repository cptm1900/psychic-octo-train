import { formatDate, formatTime } from '../hooks/useNow'

const API_URL = 'https://psychic-octo-train-production.up.railway.app'

// 서버 요청 공통 처리 : 실패하면 서버가 보낸 메세지로 에러를 던짐
async function request(path, options) {
    const res = await fetch(API_URL + path, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        throw new Error(data?.message || '서버 오류가 발생했습니다')
    }
    return data
}

// 실적 목록 조회
export async function selectResultList(lotId = '') {
    return request(`/api/results?lotId=${encodeURIComponent(lotId)}`)
}

// 실적 등록
export async function createResult(body) {
    return request('/api/results', { method: 'POST', body: JSON.stringify(body) })
}

// 실적 정정
export async function updateResult(resultId, body) {
    return request(`/api/results/${resultId}`, { method: 'POST', body: JSON.stringify(body) })
}