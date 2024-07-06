import React, { useEffect, useState } from 'react';
import styles from './TaskList.module.css'; // 이 부분에서 styles를 import

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = daysOfWeek[today.getDay()];

    useEffect(() => {
        // 예제 데이터, 실제로는 데이터베이스와 연동 필요
        const exampleTasks = [
            { name: 'Python 변수 타입 공부하기', status: true },
            { name: 'JAVA 접근제어자 공부하기', status: false }
        ];
        setTasks(exampleTasks);
    }, []);

    return (
        <div className={styles.container}> {/* styles.container와 같이 사용 */}
            <div className={styles.header}>
                <span>{dayName}</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <div id="tasks">
                {tasks.map((task, index) => (
                    <div key={index} className={styles.task}>
                        <div className={task.status ? styles.green : styles.red}></div>
                        <span>{task.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
