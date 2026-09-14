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

            <div className="home_bottom">
                <a className="home_github" href="https://github.com/cptm1900/psychic-octo-train/tree/main/Portfolio" target="_blank">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                    github
                </a>
            </div>
        </div>
    );
}

export default Landing;