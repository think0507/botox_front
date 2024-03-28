import React, {useRef, useState, useEffect} from 'react';
import usericonURL from '../img/user-icon.png';
import './RoomList.css';
import RoomListContent from "./RoomListContent";
import {useNavigate} from 'react-router-dom';
import LeftSidebar from "../navbar/LeftSidebar";
import RightSidebar from "../navbar/RightSidebar";

const RoomList = () => {

    // RoomList 덤프
    const roomInfo = [
        {
            roomNum: 10000000,
            gameName: "League of Legend",
            roomName: "방제목1",
            peopleCount: 3,
            maxPeopleCount: 5,
            isLocked: false,
            isVoiceChat: true,
            roomMasterRank: "계급1",
            roomMasterNickname: "닉네임1"
        },
        {
            roomNum: 20000000,
            gameName: "League of Legend",
            roomName: "방제목2",
            peopleCount: 4,
            maxPeopleCount: 6,
            isLocked: false,
            isVoiceChat: false,
            roomMasterRank: "계급2",
            roomMasterNickname: "닉네임2"
        },
        {
            roomNum: 30000000,
            gameName: "League of Legend",
            roomName: "방제목3",
            peopleCount: 4,
            maxPeopleCount: 5,
            isLocked: true,
            isVoiceChat: true,
            roomMasterRank: "계급3",
            roomMasterNickname: "닉네임3"
        }
        // 필요한 만큼 추가...
    ];

    //********필터링 기능*********
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    // 방 목록 필터링
    const filteredRoomInfo = roomInfo.filter(room =>
        room.roomNum.toString().includes(searchTerm) ||
        room.roomName.includes(searchTerm)
    );
    //********필터링 기능*********


    const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
    const [rooms] = useState([]); // 방 목록을 관리할 상태 추가
    const modalBackground = useRef();
    const navigate = useNavigate();

    // // ======= 페이징 =======
    // const [currentPage, setCurrentPage] = useState(1);
    // const roomsPerPage = 2; // 페이지 당 보여줄 방의 수 변경
    // const indexOfLastRoom = currentPage * roomsPerPage;
    // const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    // const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom); // 페이지에 맞게 방 목록 슬라이싱
    // const paginate = pageNumber => setCurrentPage(pageNumber);
    // //  ======= 페이징 종료 =======

    // 방 만들기 모달 열기
    const openCreateRoomModal = () => {
        setCreateRoomModalOpen(true);
    };

    // 방 만들기 모달 닫기
    const closeCreateRoomModal = () => {
        setCreateRoomModalOpen(false);
    };

    return (
        <div className="RoomList">
            <LeftSidebar/>
            <RightSidebar/>
            <div className="roomListNav">
                {/* 유저 아이콘 */}
                {/*<img className="userIcon" alt="user icon" src={usericonURL} />*/}
                {/* 방 만들기 버튼 */}
                <div className="roomListFunctionContainer">
                    <button className="modal-open-btn" onClick={openCreateRoomModal}>
                        방 만들기
                    </button>
                </div>

                <div className="roomListButtonContainer">
                    {/* 방 만들기 모달 */}
                    {createRoomModalOpen && (
                        <div className="modal-container" ref={modalBackground} onClick={(e) => {
                            if (e.target === modalBackground.current) {
                                closeCreateRoomModal();
                            }
                        }}>
                            <div className="modal-content">
                                <p>방 만들기 모달창</p>
                                {/* 제목 입력 */}
                                <input type="text" placeholder="방 제목" value={roomInfo.roomName}/>
                                {/* 인원 수 입력 */}
                                <input type="number" placeholder="인원 수" value={roomInfo.maxPeopleCount}/>
                                {/* 비밀번호 입력 */}
                                <input type="password" placeholder="비밀번호" value={roomInfo.password}/>
                                {/* 보이스 채팅 체크박스 */}
                                <label>
                                    <input type="checkbox" checked={roomInfo.isVoiceChat}/>
                                    보이스 채팅
                                </label>
                                {/* 방 만들기 버튼 */}
                                <input type="button" value="방 만들기"/>
                                <button className="modal-close-btn" onClick={closeCreateRoomModal}>
                                    모달 닫기
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="searchRoomTextBox">
                        <input className="searchRoomTextBoxInput" type="text" placeholder="방 검색" value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)} // 입력값에 따라 searchTerm 상태 업데이트
                        />
                    </div>
                </div>
            </div>

            {/* 방 목록 */}
            <div className="roomListContentContainer">
                {filteredRoomInfo.map((room, index) => (
                    <div key={room.roomNum} className="roomListItem">
                        <RoomListContent roomInfo={room}/>
                    </div>
                ))}
            </div>

            {/* 페이징 */}
            {/*<div>*/}
            {/*    {Array.from({ length: Math.ceil(rooms.length / roomsPerPage) }).map((_, index) => (*/}
            {/*        <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );

};

export default RoomList;
