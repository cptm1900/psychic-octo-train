import {useNavigate} from 'react-router-dom';
import './Landing.css';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="home">

            <div className="home_head">
                <img className="home_logo" src='/i3system_logo.gif' alt='i3system logo' />
            </div>
            
            <div className="home_menu">
                <button className="hcard" onClick={()=>navigate('/admin')}>
                    <span className="hcard_icon admin_icon">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <rect x="3" y="4" width="18" height="14" rx="2.5" />
                            <path d="M7 14.5V11M11 14.5V8.5M15 14.5v-2.5M19 14.5V7" strokeLinecap="round" />
                            <path d="M8 21h8" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="hcard_title">관리자 화면</span>
                    <span className="hcard_desc admin_desc">생산 대시보드</span>
                    <span className="hcard_detail">라인, 로트, 설비, 불량 현황을 한 화면에서 확인합니다.</span>
                </button>

                <button className="hcard" onClick={()=>navigate('/pop')}>
                    <span className="hcard_icon worker_icon">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <rect x="3" y="4" width="18" height="16" rx="2.5" />
                            <path d="M3 9h18" />
                            <path d="M7.5 13.5h4M7.5 16.5h4M15 13.5h2M15 16.5h2" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="hcard_title">작업자 화면</span>
                    <span className="hcard_desc worker_desc">생산실적관리</span>
                    <span className="hcard_detail">생산 작업에서 양품과 불량 제품을 처리합니다.</span>
                </button>
            </div>

        </div>
    );
}

export default Landing;