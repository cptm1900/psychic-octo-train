import { Doughnut } from 'react-chartjs-2';
import { colors } from '../charts/chartSetup';

function RingGauge({ value, tone }) {
    const filled = Math.min(value, 100)
    const color = tone === 'warning' ? colors.warning : colors.brand

    const data = {
        datasets: [
        {
            data: [filled, 100 - filled],
            backgroundColor: [color, colors.track],
            borderWidth: 0,
            cutout: '72%',
            circumference: 360,
            rotation: 0,
        },
        ],
    }

    const options = {
        responsive: true,
        events: [],
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }

    return (
        <div className="ring">
        <Doughnut data={data} options={options} />
        <div className="ring_center">
            <span className="ring_value">{value.toFixed(1)}%</span>
            <span className="ring_caption">생산완료율</span>
        </div>
        </div>
    )
}

export default RingGauge;