import React, { useState } from 'react';
import './board.css';
import Search from '../img/search.png';
import LeftSidebar from "../navbar/LeftSidebar";
import RightSidebar from "../navbar/RightSidebar";
import Egg from "../img/egg.png";
import Polygon from "../img/Polygon 1.png";
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { usePostContext, PostProvider } from './PostContext'; // PostProvider import 추가

const Board = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { posts } = usePostContext(); // PostContext에서 게시글 데이터 가져오기

    const navigate = useNavigate();

    const handleWrite = () => {
        navigate("/Write");
    }

    return (
        <PostProvider> {/* PostProvider로 Board 컴포넌트 감싸기 */}
            <div className="Main">
                <div className="container">
                    <LeftSidebar/>
                    <div className="main-content">
                        <h1 id="board_title">자유 게시판</h1>
                        <div className="post-create-container">
                            <button className="post-create-button" onClick={handleWrite}>게시글 작성</button>
                        </div>
                        <div className="search-container">
                            <div className="search-wrapper">
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                    className="search-input"
                                />
                                <img src={Search} alt="Search" className="search-icon"/>
                            </div>
                        </div>
                    </div>
                    {posts.map((item) => (
                        <div className="posts-container" key={item.id}>
                            <div className="post-recommend">
                                <img className="poly" src={Polygon} alt="polygon"/>
                                <h3 className="recommend">{item.recommend}</h3>
                            </div>
                            <div className="post-text">
                                <h2 className="post-title">{item.title}</h2>
                                <h3 className="post-name"><img src={Egg} alt="Egg"/>{item.author} {item.time}</h3>
                            </div>
                            <img className="post-img" src={item.image} alt="random"/>
                        </div>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={posts}
                    />
                </div>
                <RightSidebar/>
            </div>
        </PostProvider>
    );
};

export default Board;
