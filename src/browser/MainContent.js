//MainContent.js
import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css"; // CSS 모듈 import
import Calendar from "./Calendar";
import TaskList from "./TaskList"; // TaskList 컴포넌트 import
import GitHubCalendar from 'react-github-calendar';

function MainContent(props) {

    const userData = props.userData;
    const setUserData = props.setUserData;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const login = urlParams.get("login");
        const avatarUrl = urlParams.get("avatar_url");

        if (login && avatarUrl) {
            setUserData({ login, avatar_url: avatarUrl });
            sessionStorage.setItem("github_user_login", login);
            sessionStorage.setItem("github_user_avatar_url", avatarUrl);
        }
    }, []);
    console.log("MainContent.js userData: ", userData);

    const handleLogin = () => {
        window.location.href = "http://localhost:5001/login/github";
    };

    const handleLogout = () => {
        setUserData(null);
        sessionStorage.removeItem("github_user_login");
        sessionStorage.removeItem("github_user_avatar_url");
        window.location.href = "http://localhost:3000";
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
                        {!userData ? (
                            <button onClick={handleLogin}>Login with GitHub</button>
                        ) : (
                            <>
                                
                                {userData && (
                                    <div className={styles["profile-container"]}>
                                        <img src={userData.avatar_url} alt="Avatar" />
                                        <p>{userData.login}</p>
                                    </div>
                                )}
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                    {userData && (
                        <div className={styles.calendarContainer}>
                            <GitHubCalendar
                                colorScheme="light"
                                username={userData.login}
                                blockSize={18}
                                transformData={selectMonth}
                                hideColorLegend
                                hideTotalCount
                            />
                        </div>
                    )}
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
