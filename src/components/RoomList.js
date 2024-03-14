// RoomList.js

import React, { useRef, useState, useEffect } from 'react';
import usericonURL from '../img/user-icon.png';
import './RoomList.css';
import RoomListContent from "./RoomListContent";
import { useNavigate } from 'react-router-dom';
import LeftSidebar from "../navbar/LeftSidebar";
import RightSidebar from "../navbar/RightSidebar";
import Pagination from './Pagination'; // Pagination 컴포넌트 import

const RoomList = () => {
    const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]); // 방 목록을 관리할 상태 추가
    const [roomInfo, setRoomInfo] = useState({
        title: '',
        capacity: '',
        password: '',
        isVoiceChat: false // 기본값은 false로 설정
    });
    const modalBackground = useRef();
    const navigate = useNavigate();

    // ======= 페이징 =======
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 5; // 페이지 당 보여줄 방의 수 변경
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom); // 페이지에 맞게 방 목록 슬라이싱

    const paginate = pageNumber => setCurrentPage(pageNumber);
    //  ======= 페이징 종료 =======

    // 로컬 스토리지에서 방 목록을 가져와 초기화
    useEffect(() => {
        const savedRooms = JSON.parse(localStorage.getItem('rooms')) || [];
        console.log('Rooms from localStorage:', savedRooms); // 확인용 콘솔 출력
        setRooms(savedRooms.map(room => ({
            ...room,
            isVoiceChat: JSON.parse(localStorage.getItem(`room-${room.id}-isVoiceChat`)) || false
        })));
        console.log('Current Rooms:', rooms); // 현재 방 목록 출력
    }, []);

    // 방 만들기 모달 열기
    const openCreateRoomModal = () => {
        setCreateRoomModalOpen(true);
    };

    // 방 만들기 모달 닫기
    const closeCreateRoomModal = () => {
        setCreateRoomModalOpen(false);
    };

    // 방 만들기
    const createRoom = () => {
        const roomId = Math.floor(Math.random() * 1000000); // 랜덤한 방 번호 생성
        const newRoom = { ...roomInfo, id: roomId, title: `${roomId} - ${roomInfo.title}` }; // 방 번호를 제목에 추가
        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        localStorage.setItem('rooms', JSON.stringify(updatedRooms)); // 로컬 스토리지에 저장
        localStorage.setItem(`room-${roomId}-isVoiceChat`, JSON.stringify(roomInfo.isVoiceChat)); // 방이 보이스 채팅인지 여부를 저장

        if(roomInfo.isVoiceChat){
            navigate('/VoiceChatRoom');
        } else {
            navigate('/TextChatRoom');
        }
        closeCreateRoomModal();
    };

    // 방 삭제
    const deleteRoom = (roomId) => {
        const updatedRooms = rooms.filter(room => room.id !== roomId);
        setRooms(updatedRooms);
        localStorage.setItem('rooms', JSON.stringify(updatedRooms)); // 로컬 스토리지에 저장
    };

    // 방 목록에서 방을 클릭했을 때의 이벤트 핸들러
    const handleRoomClick = (roomId, isVoiceChat) => {
        localStorage.setItem('currentRoomIsVoiceChat', JSON.stringify(isVoiceChat)); // 현재 방이 보이스 채팅인지 여부를 저장
        if (isVoiceChat) {
            console.log('Current Room Is VoiceChat');
            navigate('/VoiceChatRoom');
        } else {
            console.log('Current Room Is TextChat');
            navigate('/TextChatRoom');
        }
    };

    return (
        <div className="RoomList">
            <LeftSidebar />
            <RightSidebar />
            <div className="roomListNav">
                <div className="roomListFunctionContainer">
                    <button className="modal-open-btn" onClick={openCreateRoomModal}>
                        방 만들기
                    </button>
                </div>

                {/* 방 만들기 모달 */}
                {createRoomModalOpen && (
                    <div className="modal-container" ref={modalBackground} onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            closeCreateRoomModal();
                        }
                    }}>
                        <div className="modal-content">
                            <p>방 만들기 모달창</p>
                            <input type="text" placeholder="방 제목" value={roomInfo.title} onChange={(e) => setRoomInfo({ ...roomInfo, title: e.target.value })} />
                            <input type="number" placeholder="인원 수" value={roomInfo.capacity} onChange={(e) => setRoomInfo({ ...roomInfo, capacity: e.target.value })} />
                            <input type="password" placeholder="비밀번호" value={roomInfo.password} onChange={(e) => setRoomInfo({ ...roomInfo, password: e.target.value })} />
                            <label>
                                <input type="checkbox" checked={roomInfo.isVoiceChat} onChange={(e) => setRoomInfo({ ...roomInfo, isVoiceChat: e.target.checked })} />
                                보이스 채팅
                            </label>
                            <input type="button" value="방 만들기" onClick={createRoom} />
                            <button className="modal-close-btn" onClick={closeCreateRoomModal}>
                                모달 닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 방 목록 */}
            <div className="roomListContentContainer">
                {currentRooms.map((room, index) => (
                    <div key={index} className="roomListItem">
                        <RoomListContent
                            room={room} // 방 정보를 props로 전달
                            onClick={() => handleRoomClick(room.id, room.isVoiceChat)} // 클릭 시 방이 보이스 채팅인지 여부를 함께 전달
                        />
                        <button className="delte-button" onClick={() => deleteRoom(room.id)}>방 삭제</button>
                    </div>
                ))}
            </div>

            {/* 페이징 */}
            <div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={rooms}
                />
            </div>
        </div>
    );

};

export default RoomList;
