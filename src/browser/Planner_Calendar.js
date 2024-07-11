import React, { useState } from "react";
import styles from "./Calendar.module.css";
import TaskList from "./TaskList";
import Calendar_Page from "./Calendar_Page";

function Planner_Calendar(props) {

  return (
    <div className={styles["main-container"]}>
      <div className={styles["container"]}>
        <div className={styles["calendar-container"]}>
          <Calendar_Page />
        </div>
        <div className={styles["planner-container"]}>
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Planner_Calendar;
