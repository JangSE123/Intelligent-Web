import React, { useState, useEffect } from "react";
import styles from "./CalendarContent.module.css";
import CalendarCRUD from "./CalendarCRUD";
import TaskListCRUD from "./TaskListCRUD";
import axios from 'axios';

function CalendarContent({ userData, setUserData }) {
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
        const test = 0;
        axios.get(`http://localhost:5001/api/tasks?login=${login}&date=${formattedDate}&test=${test}`)
            .then(response => {
                setTasks(response.data);
                console.log('Tasks fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    return (
        <div className={styles["main-container"]}>
            <div className={styles.container}>
                <div className={styles.calendar}>
                    <CalendarCRUD
                        login={userData ? userData.login : null}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <hr className={styles.hr}/>
                <div className={styles["task-list"]}>
                    <TaskListCRUD tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
}

export default CalendarContent;
