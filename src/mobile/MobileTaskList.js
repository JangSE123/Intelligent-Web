import React from 'react';
import styles from './MobileTaskList.module.css'; // CSS 파일도 MobileTaskList에 맞게 변경

function MobileTaskList({ tasks, setTasks, selectedDate }) {
    const displayDate = selectedDate || new Date();
    const formattedDate = displayDate.toISOString().split('T')[0];
    const dayName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][displayDate.getDay()];

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

export default MobileTaskList;
