// PostContext.js
import React, { createContext, useContext, useState } from 'react';
import randomimg from "../img/randomimg.jpeg";
// Context 생성
const PostContext = createContext();

// 컨텍스트를 사용할 수 있는 hook 생성
export const usePostContext = () => useContext(PostContext);

// Provider 컴포넌트 정의
export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        { id: 1, recommend: 80, title: "쵸비 VS 에디 후기 ㄷㄷㄷㄷㄷㄷ .JPG",content:"나도 놀랐다 ㄷㄷㄷ", author: "동욱", time: "2시간 전", image: randomimg },
        // 기존에 존재하던 게시글 데이터
    ]);

    const addPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};
