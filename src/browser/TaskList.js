import React, { useState, useEffect } from 'react';
import styles from './TaskList.module.css'; // CSS 모듈 임포트
import axios from 'axios'; // For making HTTP requests

function TaskList({ login }) {
    const [tasks, setTasks] = useState([]);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = daysOfWeek[today.getDay()];

    useEffect(() => {
        if (login) {
            // Fetch tasks from the server
            axios.get(`http://localhost:5001/api/tasks?login=${login}&date=${formattedDate}`)
                .then(response => {
                    setTasks(response.data);
                    console.log('Tasks fetched successfully:', response.data); 
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
        }
    }, [login, formattedDate]);

    const toggleTaskStatus = (id) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>{dayName}</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <div id="tasks">
                {tasks.map((task) => (
                    <div key={task.id} className={styles.task}>
                        <div
                            className={task.status ? styles.green : styles.red}
                            onClick={() => toggleTaskStatus(task.id)}
                            style={{ cursor: 'pointer' }}
                        ></div>
                        <span className={task.status ? styles.strikethrough : ''}>
                            {task.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;