import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css"; // CSS 모듈 import
import Calendar from "./Calendar";
import TaskList from "./TaskList"; // TaskList 컴포넌트 import
import GitHubCalendar from 'react-github-calendar';

function MainContent(props) {
    const [accessToken, setAccessToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Parse query parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        const login = urlParams.get('login');
        const avatarUrl = urlParams.get('avatar_url');

        if (token) {
            console.log('Access Token:', token);
            console.log('Login:', login);
            console.log('Avatar URL:', avatarUrl);

            setAccessToken(token);
            setUserData({ login, avatar_url: avatarUrl });

            // Optionally, store token in session storage to persist state across sessions
            sessionStorage.setItem('github_access_token', token);
        } else {
            // Check if token is stored in session storage
            const storedToken = sessionStorage.getItem('github_access_token');
            if (storedToken) {
                // Fetch user data using stored token
                fetchUserData(storedToken);
            }
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            const data = await response.json();
            setAccessToken(token);
            setUserData({ login: data.login, avatar_url: data.avatar_url });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogin = () => {
        // Redirect to Express server's GitHub login route
        window.location.href = 'http://localhost:5001/login/github';
    };

    const handleLogout = () => {
        setAccessToken(null);
        setUserData(null);
        sessionStorage.removeItem('github_access_token');
        window.location.href = '/'; // Redirect to home to clear URL params
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
                        {!accessToken ? (
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
