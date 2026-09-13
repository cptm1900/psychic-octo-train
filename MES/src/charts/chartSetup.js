import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

Chart.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
)

/** 차트 색을 index.css의 디자인 토큰과 같은 값으로 맞춘다. */
export function token(name, fallback = '#000') {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name)
  return v.trim() || fallback
}

export const palette = {
  brand: () => token('--brand', '#006cb8'),
  brandStrong: () => token('--brand-strong', '#005089'),
  track: () => token('--track', '#cfe5f6'),
  trackStrong: () => token('--track-strong', '#8dc0e5'),
  good: () => token('--good', '#0ca30c'),
  warning: () => token('--warning', '#fab219'),
  critical: () => token('--critical', '#d03b3b'),
  border: () => token('--border', '#e4e8f1'),
  borderStrong: () => token('--border-strong', '#d2d9e6'),
  text1: () => token('--text-1', '#0b1524'),
  text2: () => token('--text-2', '#4d5a6e'),
  text3: () => token('--text-3', '#8794a8'),
  surface: () => token('--surface', '#ffffff'),
}

Chart.defaults.font.family = token('--sans', 'system-ui, sans-serif')
Chart.defaults.font.size = 11
Chart.defaults.color = palette.text3()
Chart.defaults.animation.duration = 450
Chart.defaults.maintainAspectRatio = false

Object.assign(Chart.defaults.plugins.tooltip, {
  backgroundColor: palette.text1(),
  titleFont: { size: 11.5, weight: '700' },
  bodyFont: { size: 11 },
  padding: 8,
  cornerRadius: 6,
  displayColors: false,
})

export { Chart }
