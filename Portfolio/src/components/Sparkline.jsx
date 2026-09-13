import { Line } from 'react-chartjs-2';
import { colors } from '../charts/chartSetup';

function Sparkline({ points }) {
    const data = {
        // .map((value,index)=>{})가 기본인데 인자에 _를 쓰면 그 자리 인자를 안 쓴다는 의미
        labels: points.map((_, i) => i),
        datasets: [
            {
                data: points,
                borderColor: colors.trackStrong,
                borderWidth: 2,
                // 선 부드럽게 휘어짐
                tension: 0.35,
                // 함수로 주면 점마다 다른 크기를 줄 수 있음
                // 여기에서는 마지막 점만 3.5, 나머지는 0(안 보임)으로 해서 끝점만 강조
                pointRadius: (ctx) => (ctx.dataIndex === points.length - 1 ? 3.5 : 0),
                pointBackgroundColor: colors.brand,
                pointBorderWidth: 0
            }
        ]
    };

    const options = {
        // 반응형
        responsive: true,
        // 마우스 올려도 반응 안 함
        events: [],
        layout: { padding: 4 },
        // 축과 눈금선 전부 숨김
        scales: { x: { display: false }, y: { display: false } },
        // legend : 범례 (목표, 실적 같은 거 알려주는 작은 표시)
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }

    return (
        <div className="spark">
            <Line data={data} options={options} />
        </div>
    );
}

export default Sparkline;