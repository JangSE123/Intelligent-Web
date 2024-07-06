import React, { useState } from "react";
import styles from "./MainContent.module.css"; // CSS 모듈 import
import Calendar from "./Calendar";
import TaskList from "./TaskList"; // TaskList 컴포넌트 import
import GitHubCalendar from 'react-github-calendar';

function MainContent(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (!username || !password) {
            setError("아이디와 비밀번호를 입력해주세요.");
        } else {
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

    const selectMonth = contributions => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const shownMonths = 4;
      
        return contributions.filter(activity => {
            const date = new Date(activity.date);
            const monthOfDay = date.getMonth();
      
            return (
                date.getFullYear() === currentYear &&
                monthOfDay > currentMonth - shownMonths &&
                monthOfDay <= currentMonth
            );
        });
    };

    return (
        <div className={styles["main-container"]}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles["login-container"]}>
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
                                {error && <p className={styles.error}>{error}</p>}
                                <button onClick={handleLogin}>로그인</button>
                            </>
                        ) : (
                            <>
                                <h2>{username}님</h2>
                                <button onClick={handleLogout}>로그아웃</button>
                            </>
                        )}
                    </div>
                    <div className={styles.calendarContainer}>
                        <GitHubCalendar 
                            colorScheme="light"
                            username="JHL222" 
                            blockSize={18}
                            transformData={selectMonth} 
                            hideColorLegend
                            hideTotalCount
                        />
                    </div>
                    <div className={styles.calendar}>
                        <Calendar />
                    </div>
                </div>
                <div className={styles["content-area"]}>
                    <TaskList /> 
                </div>
                <div className={styles["Ad-area"]}>광고</div>
            </div>
        </div>
    );
}

export default MainContent;
