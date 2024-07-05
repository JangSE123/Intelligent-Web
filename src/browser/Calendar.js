import React, { useState } from 'react';
import './Calendar.css'; // CSS 파일 import

function Calendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    // 달력 UI를 생성하는 함수
    const renderCalendar = () => {
        // 간단한 예시로 현재 월의 달력을 생성
        const daysInMonth = 31; // 간단하게 31일로 설정
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(2024, 6, i); // 여기서는 2024년 7월의 달력 예시로 설정
            days.push(
                <div
                    key={i}
                    className={`calendar-day ${selectedDate && selectedDate.getDate() === i ? 'selected' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    return (
        <div className='calendar-container'>
            <h2>달력</h2>
            <div className='calendar-grid'>
                {renderCalendar()}
            </div>
            <div className='selected-date'>
                {selectedDate && (
                    <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
                )}
            </div>
        </div>
    );
}

export default Calendar;
