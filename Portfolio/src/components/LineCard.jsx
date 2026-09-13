import RingGauge from './RingGauge';

function LineCard({ name, kind, process, status, produced, target, defect, lotId, product, spec }) {
    const completion = (produced / target) * 100
    const defectRate = (defect / produced) * 100
    const remain = target - produced

    return (
        <div className="line_card">
            <div className="line_head">
                <div>
                    <h2 className="line_name">
                        {name}
                    <span className="line_kind">{kind}</span>
                    </h2>
                    <p className="line_process">{process}</p>
                </div>
                <span className={status === '가동중' ? 'chip run' : 'chip ready'}>{status}</span>
            </div>

            <div className="line_body">
                <div className="line_gauge">
                    <RingGauge value={completion} tone={completion < 50 ? 'warning' : 'brand'} />
                </div>

                <div className="line_meters">
                    <div className="meter">
                    <span className="meter_label">생산개수</span>
                    <div className="meter_bar">
                        <div className="meter_fill" style={{ width: `${completion}%` }}></div>
                    </div>
                    <span className="meter_value">
                        {produced.toLocaleString()}
                        <small> / {target.toLocaleString()}</small>
                    </span>
                    </div>

                    <div className="meter">
                    <span className="meter_label">불량개수</span>
                    <div className="meter_bar">
                        <div
                        className="meter_fill defect"
                        style={{ width: `${Math.min(defectRate * 10, 100)}%` }}
                        ></div>
                    </div>
                    <span className="meter_value">
                        {defect}
                        <small> ({defectRate.toFixed(1)}%)</small>
                    </span>
                    </div>

                    <div className="meter">
                    <span className="meter_label">잔여수량</span>
                    <div className="meter_bar">
                        <div className="meter_fill muted" style={{ width: `${(remain / target) * 100}%` }}></div>
                    </div>
                    <span className="meter_value">
                        {remain.toLocaleString()}
                        <small> EA</small>
                    </span>
                    </div>
                </div>
            </div>

            <div className="line_foot">
                <div className="line_foot_item">
                <span className="line_foot_label">로트 ID</span>
                <span className="line_foot_value">{lotId}</span>
                </div>
                <div className="line_foot_item">
                <span className="line_foot_label">생산품목</span>
                <span className="line_foot_value">{product}</span>
                <span className="line_foot_spec">{spec}</span>
                </div>
            </div>
        </div>
    )
}

export default LineCard;