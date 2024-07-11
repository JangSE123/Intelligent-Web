import React from 'react';
import styles from './TaskList.module.css';

function TaskList({ tasks, setTasks, selectedDate }) {
    const today = new Date();
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : today.toISOString().split('T')[0];
    const dayName = selectedDate ? 
        ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][selectedDate.getUTCDay()] : 
        ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][today.getUTCDay()];

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
