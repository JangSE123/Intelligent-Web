import React, { useState } from "react";
import "./DesktopMain.css"; // CSS 파일 import
import Calendar from "./Calendar";

function DesktopMain(props) {
  // 상태 관리를 위한 useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 함수
  const handleLogin = () => {
    // 간단한 예시로 username과 password가 비어있는지 확인
    if (!username || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
    } else {
      // 로그인 처리 로직 (여기서는 간단히 성공으로 가정)
      setIsLoggedIn(true);
      setError("");
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="login-container">
          {!isLoggedIn ? (
            <>
              <h2>로그인</h2>
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button onClick={handleLogin}>로그인</button>
            </>
          ) : (
            <>
              <h2>{username}님</h2>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          )}
        </div>
        <div className="empty-space"></div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
      <div className="content-area">메인</div>
      <div className="Ad-area">광고</div>
    </div>
  );
}

export default DesktopMain;
