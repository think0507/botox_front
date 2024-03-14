import React, { useState } from 'react';
import './write.css';
import { useNavigate } from "react-router-dom";
import { usePostContext } from './PostContext'; // PostContext에서 사용할 hook import

function Write() {
    const { addPost } = usePostContext(); // PostContext에서 addPost 함수 가져오기
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // 추가: 이미지 상태 추가

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    // 추가: 파일 선택 시 호출되는 함수
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!image) {
            console.error("이미지를 선택하세요.");
            return;
        }

        // 새로운 게시글 데이터 생성
        const newPost = {
            id: Math.random(), // 임시로 생성한 고유 ID
            recommend: 10,
            title,
            content,
            author: "사용자", // 작성자 정보는 임시로 고정
            time: new Date().toLocaleString(), // 현재 시간
            image: URL.createObjectURL(image) // 이미지 URL 생성하여 추가
            // 기타 필요한 정보 추가
        };

        console.log(newPost);
        // PostContext를 통해 새로운 게시글 추가
        addPost(newPost);

        // 입력 필드 초기화
        setTitle('');
        setContent('');
        setImage(null);

        // 게시판 페이지로 이동
        navigate("/Board");
    };

    return (
        <div className="write">
            <h1 className="write-title">게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <input
                        type="text"
                        id="title"
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="form-input">
                    <textarea
                        id="content"
                        value={content}
                        placeholder="내용을 입력해주세요."
                        onChange={handleContentChange}
                        required
                    ></textarea>
                </div>
                {/* 추가: 이미지 선택 버튼 */}
                <div className="form-input">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="write-submit">작성 완료</button>
            </form>
        </div>
    );
}

export default Write;
