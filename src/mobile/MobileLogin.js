import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MobileLogin.module.css";
import MobileTaskList from "./MobileTaskList";

function MobileLogin({ userData, setUserData }) {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/tasks', { withCredentials: true });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:5001/login/github";
    };

    const handleLogout = () => {
        setUserData(null);
        sessionStorage.removeItem("github_user_login");
        sessionStorage.removeItem("github_user_avatar_url");
    };

    return (
        <div className={styles["login-body"]}>
            <div className={styles["login-container"]}>
                {!userData ? (
                    <>
                        <p>Login with GitHub!</p>
                        <div className={styles["login-github"]} onClick={handleLogin}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fff"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Login
                        </div>
                    </>
                ) : (
                    <>
                        <p>Hello, {userData.nickname}</p>
                        <img src={userData.AvatarURL} className={styles.MyAvatar} alt="Avatar" />
                        <button className={styles["logout-button"]} onClick={handleLogout}>LogOut</button>
                    </>
                )}
            </div>
            <div className={styles.MobileTasklist}>
                <MobileTaskList tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} />
            </div>
        </div>
    );
}

export default MobileLogin;
