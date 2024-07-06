import React, { useState } from "react";
import styles from "./Calendar.module.css";
import Calendar from "./Calendar";
import TaskList from "./TaskList";

function Planner_Calendar(props) {
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
          className={`${styles["calendar-day"]} ${
            selectedDate && selectedDate.getDate() === i ? styles.selected : ""
          }`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["container"]}>
        <div className={styles["calendar-container"]}>
          <Calendar />
        </div>
        <div className={styles["planner-container"]}>
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
