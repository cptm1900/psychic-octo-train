import { useEffect, useState } from 'react'

/** 1초 단위로 갱신되는 현재 시각 */
export function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

const pad = (n) => String(n).padStart(2, '0')

export const formatDate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const formatTime = (d) =>
  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
