import React from 'react';
import { Link } from "react-router-dom";
import './LeftSidebar.css';
import UserImg from "../img/user.png"
const LeftSidebar = () => {
    const handleLogout = () => {
        // 여기에 로그아웃 로직을 추가하세요 (예: 세션 삭제, 상태 변경 등)
        alert("로그아웃 되었습니다.");
    };

    return (
        <div className='LeftSidebar'>
            <ul className="left-list">
                <li>
                    <img className="user-img" src={UserImg} alt="user"/>
                    <span>???님</span>
                </li>
            </ul>
            <ul className="left-list">
                <li><Link className="menu" to="/">홈</Link></li>
                <li><Link className="menu" to="/Board">게시판</Link></li>
                <li><Link className="menu" to="/Login" onClick={handleLogout}>로그아웃</Link></li> {/* 로그아웃 버튼에 onClick 이벤트 핸들러 추가 */}
            </ul>
        </div>
    );
}

export default LeftSidebar;