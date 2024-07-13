import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

function MainContent({ userData, setUserData }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchSessionUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/session-user', { withCredentials: true });
                if (response.data) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching session user data:', error);
            }
        };

        fetchSessionUserData();
    }, [setUserData]);

    useEffect(() => {
        if (userData && selectedDate) {
            fetchTasks(userData.login, selectedDate);
        }
    }, [userData, selectedDate]);

    const fetchTasks = (login, date) => {
        const formattedDate = date.toISOString().split('T')[0];
        axios.get(`http://localhost:5001/api/tasks?login=${login}&date=${formattedDate}`)
            .then(response => {
                setTasks(response.data);
                console.log('Tasks fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleLogin = () => {
        window.location.href = "http://localhost:5001/login/github";
    };

    const handleLogout = () => {
        axios.post('http://localhost:5001/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUserData(null);
                window.location.href = "http://localhost:3000";
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
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
                                        <img src={userData.AvatarURL} alt="Avatar" />
                                        <p>{userData.nickname} <span style={{ fontSize: '0.7em', color: "gray" }}>@{userData.login}</span></p>
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
                        <Calendar
                            login={userData ? userData.login : null}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>
                </div>
                <div className={styles["content-area"]}>
                    <TaskList tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} />
                </div>
                <div className={styles["Ad-area"]}>광고</div>
            </div>
        </div>
    );
}

export default MainContent;
