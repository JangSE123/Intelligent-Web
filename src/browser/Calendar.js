import React, { useState } from 'react';
import styles from './Calendar.module.css'; 

function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();

    // Function to format the date as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to render today's date with the "오늘" label
    const renderToday = () => {
        return `${formatDate(today)}`;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const daysInMonth = 31; // Assume 31 days for the month of July
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(2024, 6, i); // Year, month (0-based), day
            const isToday = today.getFullYear() === date.getFullYear() &&
                            today.getMonth() === date.getMonth() &&
                            today.getDate() === date.getDate();

            days.push(
                <div
                    key={i}
                    className={`${styles['calendar-day']} ${isToday ? styles.today : ''} ${selectedDate && selectedDate.getDate() === i ? styles.selected : ''}`}
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
            <h2 className={styles.calendarH2}>{renderToday()}</h2> {/* Display today's date with "오늘" */}
            <div className={styles['calendar-grid']}>
                {renderCalendar()}
            </div>
            <div className={styles['selected-date']}>
                {selectedDate && (
                    <p className={styles.selectedPTag}>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
                )}
            </div>
        </div>
    );
}

export default Calendar;
