import React from 'react';
import {Link} from "react-router-dom";
import './RightSidebar.css';
import Plus from "../img/plus.png"

const RightSidebar = () => {
  return (
    <div className='RightSidebar'>
        <ul className="plus-button">
            <li>
                <img className="plus-friend" src={Plus} alt="Plus"/>
            </li>
        </ul>
        <ul>
            <li>
                <h2 className="state">온라인</h2>
                <h3>think0507</h3>
            </li>
        </ul>
        <ul>
            <li>
                <h2 className="state-off">오프라인</h2>
                <h3>dongwook1234</h3>
            </li>
        </ul>
    </div>
  );
}

export default RightSidebar;