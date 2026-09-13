import { useEffect, useState } from 'react';

export function useNow() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000)
        // useEffect에서 함수를 return하면 리액트가 컴포넌트에서 화면이 사라질 때 그 함수를 실행
        // 이거 안 하면 다른 페이지로 이동해도 타이머가 계속 돌면서 이미 사라진 컴포넌트의 state를 바꾸려고 계속 시도해서 메모리 누수남
        return () => clearInterval(id)
    }, [])  // [] 빈 배열은 처음 한 번만 실행하라는 뜻 (이거 안 하면 1초마다 렌더링 되면서 타이머가 계속 생김)

    return now
}

const pad = (n) => String(n).padStart(2, '0')

export const formatDate = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const formatTime = (d) =>
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

export const weekday = ['일', '월', '화', '수', '목', '금', '토'];