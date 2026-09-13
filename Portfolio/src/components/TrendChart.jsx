import { Bar } from 'react-chartjs-2';
import { colors } from '../charts/chartSetup';

function TrendChart({ title, sub, labels, values, target }) {
    const data = {
        labels,
        datasets: [
        {
            data: values,
            backgroundColor: values.map((v) => (v >= target ? colors.good : colors.warning)),
            borderRadius: 4,
            barPercentage: 0.6,
        },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        },
        scales: {
        x: {
            grid: { display: false },
        },
        y: {
            beginAtZero: true,
            grid: { color: '#f2f4f8' },
            border: { display: false },
        },
        },
    }

    const achieved = values.filter((v) => v >= target).length

    return (
        <div className="trend">
        <div className="trend_head">
            <div>
            <h2 className="card_title">{title}</h2>
            <p className="card_sub">
                {sub} · 목표 달성 {achieved}/{values.length}
            </p>
            </div>
            <div className="trend_legend">
            <span className="lg good">달성</span>
            <span className="lg warn">미달</span>
            </div>
        </div>

        <div className="trend_body">
            <Bar data={data} options={options} />
        </div>
        </div>
    )
}

export default TrendChart;