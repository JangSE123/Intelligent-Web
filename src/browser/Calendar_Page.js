import React, { useState, useEffect } from 'react';
import styles from './Calendar_Page.module.css';

function Calendar_Page() {
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    useEffect(() => {
        setSelectedDate(null);
    }, [year, month]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value, 10));
    };

    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value, 10));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`blank-${i}`} className={styles['calendar-day']} />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = today.getFullYear() === date.getFullYear() &&
                            today.getMonth() === date.getMonth() &&
                            today.getDate() === i;
            const dayOfWeek = date.getDay();
            let dayClassName = styles['calendar-day'];
            if (dayOfWeek === 0) {
                dayClassName += ` ${styles.sunday}`;
            } else if (dayOfWeek === 6) {
                dayClassName += ` ${styles.saturday}`;
            }

            days.push(
                <div
                    key={i}
                    className={`${dayClassName} ${
                        isToday ? styles.today : ''
                    } ${
                        selectedDate &&
                        selectedDate.getDate() === i &&
                        selectedDate.getMonth() === month &&
                        selectedDate.getFullYear() === year
                            ? styles.selected
                            : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const goToPreviousMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    const goToPreviousYear = () => {
        setYear(year - 1);
    };

    const goToNextYear = () => {
        setYear(year + 1);
    };

    return (
        <div className={styles['calendar-container']}>
            <div className={styles['controls']}>
                <button className={styles['date_btn']} onClick={goToPreviousYear}>{'<<'}</button>
                <button className={styles['date_btn']} onClick={goToPreviousMonth}>{'<'}</button>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className={styles['year-select']}
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={today.getFullYear() - 5 + i}>
                            {today.getFullYear() - 5 + i}
                        </option>
                    ))}
                </select>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className={styles['month-select']}
                >
                    {[
                        '1월',
                        '2월',
                        '3월',
                        '4월',
                        '5월',
                        '6월',
                        '7월',
                        '8월',
                        '9월',
                        '10월',
                        '11월',
                        '12월',
                    ].map((m, index) => (
                        <option key={index} value={index}>
                            {m}
                        </option>
                    ))}
                </select>
                <button className={styles['date_btn']} onClick={goToNextMonth}>{'>'}</button>
                <button className={styles['date_btn']} onClick={goToNextYear}>{'>>'}</button>
            </div>
            <div className={styles['day-labels']}>
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                    <div key={index} className={styles['day-label']}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles['calendar-grid']}>{renderCalendar()}</div>
            <div className={styles['selected-date']}>
                {selectedDate && (
                    <p className={styles.selectedPTag}>
                        선택된 날짜: {selectedDate.toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Calendar_Page;
