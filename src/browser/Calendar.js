import React, { useState } from 'react';
import styles from './Calendar.module.css'; 

function Calendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const daysInMonth = 31; // 임의의 값으로 설정
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(2024, 6, i); // 년, 월, 일 설정 (월은 0부터 시작)
            days.push(
                <div
                    key={i}
                    className={`${styles['calendar-day']} ${selectedDate && selectedDate.getDate() === i ? styles.selected : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    return (
        <div className={styles['calendar-container']}>
            <h2>달력</h2>
            <div className={styles['calendar-grid']}>
                {renderCalendar()}
            </div>
            <div className={styles['selected-date']}>
                {selectedDate && (
                    <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
                )}
            </div>
        </div>
    );
}

export default Calendar;
