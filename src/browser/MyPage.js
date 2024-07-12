import React, { useState, useEffect } from "react";
import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import NicknameModal from './NicknameModal'; // Import the NicknameModal component
import styles from './MyPage.module.css'; // Import the CSS module

export default function MyPage({ userData, setUserData }) {
  const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchSessionUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/session-user', { withCredentials: true });
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching session user data:', error);
      }
    };

    fetchSessionUserData();
  }, [setUserData]);

  const handleChangeNickname = async (newNickname) => {
    try {
      const response = await axios.post('http://localhost:5001/api/user/updateNickname', { nickname: newNickname }, { withCredentials: true });
      if (response.status === 200) {
        setUserData(prevData => ({ ...prevData, nickname: newNickname }));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };

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

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.MyPageMain}>
      <div className={styles.MyPageProfile}>
        <img src={userData.AvatarURL} className={styles.MyAvatar} alt="Avatar" />
        <div className={styles.ProfileInfo}>
          <p>{userData.nickname}
            <button onClick={() => setIsModalOpen(true)}>Edit</button></p>
        </div>
      </div>
      <div className={styles.MyInfo}>
        <p className={styles.GitCalendarP}>My GitHub Calendar</p>
        <div className={styles.GitCalendarWrapper}>
          <GitHubCalendar
            colorScheme="light"
            username={userData.login}
            blockSize={19}
            transformData={selectMonth}
            hideColorLegend
            hideTotalCount
          />
        </div>
      </div>

      <div className={styles.MyAchievement}>
        <div className={styles.NavTabs}>
          <button className={activeTab === 'tab1' ? styles.activeTab : ''} onClick={() => setActiveTab('tab1')}>My Achievement</button>
          <button className={activeTab === 'tab2' ? styles.activeTab : ''} onClick={() => setActiveTab('tab2')}>Tab 2</button>
        </div>
        <div className={styles.TabContent}>
          {activeTab === 'tab1' && <div>
              Content for Tab 1
            </div>}
          {activeTab === 'tab2' && <div>
              Content for Tab 2
            </div>}
        </div>
      </div>

      <div className={styles.s}></div>

      {/* Include NicknameModal */}
      <NicknameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleChangeNickname}
      />
    </div>
  );
}