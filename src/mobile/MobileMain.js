import React from 'react';
import GitHubCalendar from 'react-github-calendar';
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
function MobileMain(props) {
    return (
        <div>
<GitHubCalendar 
colorScheme	="light"
  username="hanjunnn" 
  blockSize	= {18}
  transformData={selectMonth} 
  hideColorLegend
  hideTotalCount
  
//   labels={{
//     totalCount: '{{count}} contributions in the last half year',
//   }}
/>
</div>
    );
}

export default MobileMain;