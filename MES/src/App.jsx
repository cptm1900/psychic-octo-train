import { useCallback, useEffect, useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Production from './pages/Production'

/**
 * 라우터 의존성 없이 해시로만 화면을 나눈다. (브라우저 뒤로가기도 그대로 동작)
 *  #/        메인 — 화면 선택
 *  #/admin   관리자 화면 — 생산 대시보드
 *  #/worker  작업자 화면 — 생산실적관리
 */
const ROUTES = { home: '#/', admin: '#/admin', worker: '#/worker' }

const readRoute = () => {
  const key = window.location.hash.replace(/^#\/?/, '')
  return key in ROUTES && key !== 'home' ? key : 'home'
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const navigate = useCallback((next) => {
    window.location.hash = ROUTES[next] ?? ROUTES.home
  }, [])

  const goHome = useCallback(() => navigate('home'), [navigate])

  if (route === 'admin') return <Dashboard onHome={goHome} />
  if (route === 'worker') {
    return <Production onHome={goHome} onAdmin={() => navigate('admin')} />
  }
  return <Home onSelect={navigate} />
}
