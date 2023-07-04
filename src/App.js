import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FriendChatBox from "./components/ChatLayoutChildren/FriendChatBox";
import Photo from "./components/ChatLayoutChildren/Photo";
import ChatLayout from "./components/ChatLayout";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reactChatWeb/:adminId" element={<ChatLayout />}>
          <Route index element={<Photo />} />
          <Route path=":friendId" element={<FriendChatBox />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
