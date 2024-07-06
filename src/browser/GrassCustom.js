import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import styles from './GrassCustom.module.css';

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

export default function GrassCustom() {
  return (
    <div className={styles.body}>
      <div className={styles.calendarContainer}>
                <GitHubCalendar 
                    colorScheme="light"
                    username="hanjunnn" 
                    blockSize={30}
                    transformData={selectMonth} 
                    hideColorLegend
                    hideTotalCount
                />
      </div>
    </div>
  )
}
