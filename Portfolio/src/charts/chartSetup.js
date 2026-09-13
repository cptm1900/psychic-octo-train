import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  ArcElement,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

// Chart.js는 용량을 줄이려고 쓸 기능만 골라서 register로 등록하는 구조
Chart.register(
    // 막대 차트 (등록 안 하고 쓰면 controller를 찾을 수 없다고 에러 남)
    BarController,
    BarElement,

    CategoryScale,
    DoughnutController,
    ArcElement,
    Legend,

    // 선 차트 (등록 안 하고 쓰면 controller를 찾을 수 없다고 에러 남)
    LineController,
    LineElement,
    LinearScale,
    PointElement,

    Tooltip,
)

export const colors = {
  brand: '#006cb8',
  track: '#cfe5f6',
  trackStrong: '#8dc0e5',
  good: '#0ca30c',
  warning: '#fab219',
  critical: '#d03b3b',
  text3: '#8794a8',
}

Chart.defaults.font.size = 11
Chart.defaults.color = colors.text3
// 기본값 true, 차트가 자기 비율을 고집해서 컨테이너 크기를 무시함
// false로 해야 부모 div 크기에 맞춰짐
// (이거 안 하면 차트가 화면을 뚫고 나가거나 이상하게 작아짐)
Chart.defaults.maintainAspectRatio = false

export { Chart }