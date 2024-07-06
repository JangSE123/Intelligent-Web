import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import styles from './Todolist.module.css';
import calendarStyles from './GitHubCalendar.module.css'; // 추가된 부분

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

function MobileMain(props) {
    const [tasks, setTasks] = useState([]);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayName = daysOfWeek[today.getDay()];

    useEffect(() => {
        // 예제 데이터 데이터베이스 연동 필요
        const exampleTasks = [
            { name: 'Python 변수 타입 공부하기', status: true },
            { name: 'JAVA 접근제어자 공부하기', status: false }
        ];
        setTasks(exampleTasks);
    }, []);

    return (
        <div style={{marginTop:"90px"}}>
            <h2>ㅇㅇ의 정원</h2>
            {/* 깃허브 캘린더 */}
            <div className={calendarStyles.calendarContainer}>
                <GitHubCalendar 
                    colorScheme="light"
                    username="hanjunnn" 
                    blockSize={18}
                    transformData={selectMonth} 
                    hideColorLegend
                    hideTotalCount
                />
            </div>
            <br/>
            <h2>오늘의 일정</h2>
            {/* 일정 목록 */}
            <div className={styles.container}>
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
        </div>
    );
}

export default MobileMain;
