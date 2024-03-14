import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Main from './navbar/Main';
import Login from './navbar/Login';
import RoomList from './components/RoomList';
import MainGameComponents from "./components/MainGameComponents";
import TextChatRoom from "./components/TextChatRoom";
import VoiceChatRoom from "./components/VoiceChatRoom";
import Board from "./components/Board";
import Signup from "./components/Signup";
import Write from "./components/Write";
import { PostProvider } from './components/PostContext'; // PostProvider import

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Nav />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/Board" element={<PostProvider><Board /></PostProvider>} />
                    <Route path="/RoomList" element={<RoomList />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Login" element={<Login />} />
                    {/* PostProvider로 Write 컴포넌트 감싸기 */}
                    <Route path="/Write" element={<PostProvider><Write /></PostProvider>} />
                    <Route path="/:gameName" element={<MainGameComponents />} />
                    <Route path="/TextChatRoom" element={<TextChatRoom />} />
                    <Route path="/VoiceChatRoom" element={<VoiceChatRoom />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
