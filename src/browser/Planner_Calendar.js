import React, { useEffect } from "react";
import styles from "./Planner_Calendar.module.css";
import CalendarContent from "./CalendarContent";

function Planner_Calendar(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;

  useEffect(() => {
    // Function to handle scroll snapping effect
    const handleScroll = () => {
      const position = window.scrollY;
      const main = document.querySelector(`.${styles.main}`);

      // Update the body's scroll snapping behavior
      if (position === 0) {
        main.style.scrollSnapType = "none";
      } else {
        main.style.scrollSnapType = "y mandatory";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div className={styles.main}>
        <div className={styles.section}>
          <div className={styles.content}>
            <CalendarContent userData={userData} setUserData={setUserData}/>
          </div>
        </div>
      </div>
  );
}

export default Planner_Calendar;

