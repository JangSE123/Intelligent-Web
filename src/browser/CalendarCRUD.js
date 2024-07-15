import React, { useState, useEffect } from 'react';
import styles from './CalendarCRUD.module.css';
import { RxCaretLeft, RxDoubleArrowLeft, RxCaretRight, RxDoubleArrowRight } from "react-icons/rx";

function CalendarCRUD({ login, selectedDate, setSelectedDate }) {
    const today = new Date();
    const [year, setYear] = useState(today.getUTCFullYear());
    const [month, setMonth] = useState(today.getUTCMonth());

    useEffect(() => {
        if (!selectedDate) {
            setSelectedDate(new Date(year, month, today.getDate()));
        }
    }, [year, month]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();
        const days = [];

        // Add blank cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`blank-${i}`} className={styles['calendar-day']} />);
        }

        // Add cells for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(Date.UTC(year, month, i));
            const isToday =
                today.getUTCFullYear() === date.getUTCFullYear() &&
                today.getUTCMonth() === date.getUTCMonth() &&
                today.getUTCDate() === i;

            // Determine if the current date is Sunday or Saturday
            const dayOfWeek = date.getUTCDay();
            let dayClassName = styles['calendar-day'];
            if (dayOfWeek === 0) {
                dayClassName += ` ${styles.sunday}`; // Sunday
            } else if (dayOfWeek === 6) {
                dayClassName += ` ${styles.saturday}`; // Saturday
            }

            days.push(
                <div
                    key={i}
                    className={`${dayClassName} ${
                        isToday ? styles.today : ''
                    } ${
                        selectedDate &&
                        selectedDate.getUTCDate() === i &&
                        selectedDate.getUTCMonth() === month &&
                        selectedDate.getUTCFullYear() === year
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

    const getDaysInMonth = (year, month) => {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate(); // Get the number of days in the specified month
    };

    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value, 10));
    };

    const handleMonthChange = (event) => {
        setMonth(parseInt(event.target.value, 10));
    };

    const goToPreviousMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11); // December (11) when going back from January (0)
        } else {
            setMonth(month - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0); // January (0) when going forward from December (11)
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
                <button className={styles['date_btn']} onClick={goToPreviousYear}>{<RxDoubleArrowLeft />}</button>
                <button className={styles['date_btn']} onClick={goToPreviousMonth}>{<RxCaretLeft />}</button>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className={styles['year-select']}
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={today.getUTCFullYear() - 5 + i}>
                            {today.getUTCFullYear() - 5 + i}
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
                <button className={styles['date_btn']} onClick={goToNextMonth}>{<RxCaretRight/>}</button>
                <button className={styles['date_btn']} onClick={goToNextYear}>{<RxDoubleArrowRight/>}</button>
            </div>
            <div className={styles['day-labels']}>
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                    <div key={index} className={styles['day-label']}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles['calendar-grid']}>{renderCalendar()}</div>
        </div>
    );
}

export default CalendarCRUD;