import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './DesktopMain.module.css';

function DesktopMain() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [todos, setTodos] = useState({
        '2024-07-05': ['Task 1', 'Task 2'],
        '2024-07-06': ['Task 3'],
        // Add initial to-dos here
    });

    // Function to handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Function to get formatted date string
    const getFormattedDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Get the to-do list for the selected date
    const selectedDateTodos = todos[getFormattedDate(selectedDate)] || [];

    useEffect(() => {
        // Function to handle scroll snapping effect
        const handleScroll = () => {
            const position = window.scrollY;
            const main = document.querySelector(`.${styles.main}`);

            // Update the body's scroll snapping behavior
            if (position === 0) {
                main.style.scrollSnapType = 'none';
            } else {
                main.style.scrollSnapType = 'y mandatory';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.section}>
                <div className={styles.image} />
            </div>
            <div className={styles.section}>
                <div className={styles.content}>
                    <h1>메인 내용</h1>
                </div>
            </div>
            <div className={styles.section}>
                <section className={styles.nextSection}>
                    <div className={styles.calendarContainer}>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            locale="ko-KR"
                            formatShortWeekday={(locale, date) => ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                            tileClassName={({ date, view }) => {
                                if (view === 'month') {
                                    const day = date.getDay();
                                    if (day === 0) return styles.sunday;
                                    if (day === 6) return styles.saturday;
                                }
                                return null;
                            }}
                        />
                        <div className={styles.todoList}>
                            <h3>{`To-Do List for ${getFormattedDate(selectedDate)}`}</h3>
                            {selectedDateTodos.length > 0 ? (
                                <ul>
                                    {selectedDateTodos.map((todo, index) => (
                                        <li key={index} className={styles.todoContent}>{todo}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tasks for this date.</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.section}>
                <section className={styles.nextSection}>
                    <h2>다음 화면 2</h2>
                    <p>여기에 추가적인 내용이 들어갑니다.</p>
                </section>
            </div>
        </div>
    );
}

export default DesktopMain;
