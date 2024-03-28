import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomListContent.css'
import lollLogo from '../img/lol-logo.png';
import lockedIcon from '../img/icons8-locked-48.png';
import unlockedIcon from '../img/icons8-unlocked-48.png';
import userIcon from '../img/user-icon.png';

const RoomListContent = ({ roomInfo }) => {
    const { roomNum, gameName, roomName, peopleCount, maxPeopleCount, isLocked, isVoiceChat, roomMasterRank, roomMasterNickname } = roomInfo;
    const navigate = useNavigate();

    const lockedCheck = () => {
        if (isLocked) {
            return lockedIcon;
        } else {
            return unlockedIcon;
        }
    }

    const handleClick = () => {
        if (isVoiceChat) {
            navigate('/VoiceChatRoom');
        } else {
            navigate('/TextChatRoom');
        }
    };

    return (
        <div className="roomListContent" onClick={handleClick}>
            <div>
                <img className="roomListContentGameImage" src={lollLogo} alt="gameImgae"/>
            </div>
            <div className="roomListRightContent">
                <div className="topOfContent">
                    <div className="gameName">{gameName}</div>
                    <div className="topRightContainer">
                        <img className="userIcon" src={userIcon} alt="user icon"/>
                        <div className="peopleCount">{peopleCount}/</div>
                        <div className="maxPeopleCount">{maxPeopleCount}</div>
                        <img className="lockImage" src={lockedCheck()} alt="lock status"></img>
                    </div>

                </div>

                <div className="roomNum">No.{roomNum}</div>
                <div className="roomName">{roomName}</div>
                <div className="bottomContainer">
                    <div className="roomMasterRankIcon"><img width="48" height="48"
                                                        src="https://img.icons8.com/emoji/48/hatching-chick--v2.png"
                                                        alt="hatching-chick--v2"/>{roomMasterRank}
                    </div>
                    <div className="roomMasterNickname">{roomMasterNickname}</div>
                </div>
            </div>
        </div>
    );
};

export default RoomListContent;
