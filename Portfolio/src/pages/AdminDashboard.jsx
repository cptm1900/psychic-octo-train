import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkline from '../components/Sparkline';
import LineCard from '../components/LineCard';
import TrendChart from '../components/TrendChart';
import { lots, statusLabel, equipments, equipLabel, defects, dailyTrend, weeklyTrend, monthlyTrend } from '../data/mockData'
import { useNow, formatDate, formatTime, weekday } from '../hooks/useNow'

import './AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const now = useNow();
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')

    const rows = lots.filter((lot) => {
        const matchFilter = filter === 'all' || lot.status === filter
        const matchQuery =
        query === '' ||
        lot.id.toLowerCase().includes(query.toLowerCase()) ||
        lot.product.toLowerCase().includes(query.toLowerCase())
        return matchFilter && matchQuery
    })

    return (
        <div className="dash_background">
            <div className="dash">
                <div className="dash_head">
                    <div className="dash_logo_wrap">
                        <button className="logo_btn" onClick={()=>navigate('/')} title="메인화면으로 이동" >
                            <img className="dash_logo" src="/i3system_logo.gif" alt="i3system logo" />
                        </button>
                    </div>

                    <div className="dash_head_center">
                        <h1 className="dash_title">생산 대시보드</h1>
                        <p className="dash_subtitle">적외선 영상센서 생산 공정</p>
                    </div>

                    <div className="dash_time">
                        <div className="dash_date">
                            {formatDate(now)} ({weekday[now.getDay()]})
                        </div>
                        <div className="dash_clock">{formatTime(now)}</div>
                    </div>
                </div>

                <div className="summary">
                    <div className="tile">
                        <div className="tile_body">
                            <span className="tile_label">금일 총 생산</span>
                            <span className="tile_value">1,306<small>EA</small></span>
                        </div>
                        <Sparkline points={[980, 1120, 1050, 1240, 1180, 1306]} />
                    </div>
                    <div className="tile">
                        <div className="tile_body">
                            <span className="tile_label">목표 달성률</span>
                            <span className="tile_value">58.8%</span>
                            <span className="tile_delta good">▲ 2.4%p <span className="tile_delta day_over_day">전일 대비</span></span>
                        </div>
                    </div>
                    <div className="tile">
                        <div className="tile_body">
                            <span className="tile_label">양품률</span>
                            <span className="tile_value">95.9%</span>
                            <span className="tile_delta bad">▼ 0.8%p <span className="tile_delta day_over_day">전일 대비</span></span>
                        </div>
                        <Sparkline points={[96.8, 96.2, 96.5, 95.4, 96.1, 95.9]} />
                    </div>
                    <div className="tile">
                        <div className="tile_body">
                            <span className="tile_label">가동 라인</span>
                            <span className="tile_value">2 / 3<small>LINE</small></span>
                        </div>
                    </div>
                    <div className="tile">
                        <div className="tile_body">
                            <span className="tile_label">금일 불량</span>
                            <span className="tile_value">54<small>EA</small></span>
                            <span className="tile_delta bad">▲ 1.1%p <span className="tile_delta day_over_day">전일 대비</span></span>
                        </div>
                    </div>
                </div>

                <div className="lines">
                    <LineCard
                        name="Line 1"
                        kind="냉각형"
                        process="조립"
                        status="가동중"
                        produced={120}
                        target={120}
                        defect={7}
                        lotId="SMKS-2609-014"
                        product="Super MARKOS"
                        spec="T2SL MW 1280×1024 (10㎛)"
                    />
                    <LineCard
                        name="Line 2"
                        kind="냉각형"
                        process="포장"
                        status="가동중"
                        produced={1144}
                        target={1800}
                        defect={45}
                        lotId="LKS-2609-131"
                        product="LUKAS"
                        spec="T2SL LW 640×512 (15㎛)"
                    />
                    <LineCard
                        name="Line 3"
                        kind="비냉각형"
                        process="FT"
                        status="준비중"
                        produced={42}
                        target={300}
                        defect={2}
                        lotId="TEQ1-2609-007"
                        product="TE-EQ1"
                        spec="비냉각형 검출기"
                    />
                </div>

                <div className="dash_bottom">
                    <div className="lot_card">
                        <div className="lot_head">
                        <div>
                            <h2 className="card_title">로트 관리</h2>
                            <p className="card_sub">조회된 로트 {rows.length}건</p>
                        </div>

                        <div className="lot_tools">
                            <div className="seg">
                                <button className={filter === 'all' ? 'seg_btn on' : 'seg_btn'} onClick={() => setFilter('all')}>전체</button>
                                <button className={filter === 'run' ? 'seg_btn on' : 'seg_btn'} onClick={() => setFilter('run')}>진행</button>
                                <button className={filter === 'setup' ? 'seg_btn on' : 'seg_btn'} onClick={() => setFilter('setup')}>준비</button>
                                <button className={filter === 'hold' ? 'seg_btn on' : 'seg_btn'} onClick={() => setFilter('hold')}>보류</button>
                                <button className={filter === 'done' ? 'seg_btn on' : 'seg_btn'} onClick={() => setFilter('done')}>완료</button>
                            </div>

                            <input
                                className="lot_search"
                                type="text"
                                placeholder="로트 ID · 품목 검색"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        </div>

                        <div className="lot_table_wrap">
                            <table className="lot_table">
                                <thead>
                                    <tr>
                                    <th className="c">순번</th>
                                    <th>로트 ID</th>
                                    <th className="c">라인</th>
                                    <th>생산품목 · 규격</th>
                                    <th className="r">총수량</th>
                                    <th className="r">완료수량</th>
                                    <th className="r">불량수량</th>
                                    <th className="r">불량률</th>
                                    <th>생산완료율</th>
                                    <th className="r">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((lot) => {
                                        const rate = (lot.done / lot.total) * 100
                                        const defectRate = (lot.defect / lot.done) * 100

                                        return (
                                            <tr key={lot.id}>
                                            <td className="c">{lot.seq}</td>
                                            <td className="strong">{lot.id}</td>
                                            <td className="c">{lot.line}</td>
                                            <td>
                                                <div className="strong">{lot.product}</div>
                                                <div className="sub">{lot.spec}</div>
                                            </td>
                                            <td className="r">{lot.total.toLocaleString()}</td>
                                            <td className="r">{lot.done.toLocaleString()}</td>
                                            <td className="r">{lot.defect}</td>
                                            <td className={defectRate >= 5 ? 'r bad' : 'r'}>{defectRate.toFixed(1)}%</td>
                                            <td>
                                                <div className="rate_wrap">
                                                <div className="rate_bar">
                                                    <div className="rate_fill" style={{ width: `${Math.min(rate, 100)}%` }}></div>
                                                </div>
                                                <span className="rate_text">{rate.toFixed(0)}%</span>
                                                </div>
                                            </td>
                                            <td className="c">
                                                <span className={`lot_chip ${lot.status}`}>{statusLabel[lot.status]}</span>
                                            </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="side">
                        <div className="panel">
                            <h2 className="card_title">설비 상태</h2>
                            <table className="equip_table">
                                <thead>
                                    <tr>
                                    <th>설비</th>
                                    <th>Line 1</th>
                                    <th>Line 2</th>
                                    <th>Line 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipments.map((eq) => (
                                        <tr key={eq.code}>
                                            <td>
                                            <span className="equip_code">{eq.code}</span>
                                            <span className="equip_name">{eq.name}</span>
                                            </td>
                                            <td className="c"><span className={`dot ${eq.line1}`}>{equipLabel[eq.line1]}</span></td>
                                            <td className="c"><span className={`dot ${eq.line2}`}>{equipLabel[eq.line2]}</span></td>
                                            <td className="c"><span className={`dot ${eq.line3}`}>{equipLabel[eq.line3]}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="panel">
                            <h2 className="card_title">금일 불량 유형</h2>
                            <br/>
                            <div className="defect_list">
                                {defects.map((d) => (
                                    <div className="defect_row" key={d.name}>
                                        <span className="defect_name">{d.name}</span>
                                        <div className="defect_bar">
                                            <div className="defect_fill" style={{ width: `${(d.count / 18) * 100}%` }}></div>
                                        </div>
                                        <span className="defect_count">{d.count}</span>
                                        <span className="defect_pct">{Math.round((d.count / 54) * 100)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="trends">
                    <TrendChart
                        title="일간 추이"
                        sub="최근 7일"
                        labels={dailyTrend.labels}
                        values={dailyTrend.values}
                        target={dailyTrend.target}
                    />
                    <TrendChart
                        title="주간 추이"
                        sub="최근 8주"
                        labels={weeklyTrend.labels}
                        values={weeklyTrend.values}
                        target={weeklyTrend.target}
                    />
                    <TrendChart
                        title="월간 추이"
                        sub="최근 12개월"
                        labels={monthlyTrend.labels}
                        values={monthlyTrend.values}
                        target={monthlyTrend.target}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;