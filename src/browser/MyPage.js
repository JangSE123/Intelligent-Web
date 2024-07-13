import React, { useState, useEffect } from "react";
import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import NicknameModal from './NicknameModal'; // Import the NicknameModal component
import styles from './MyPage.module.css'; // Import the CSS module

export default function MyPage({ userData, setUserData }) {
  const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [progress, setProgress] = useState(Array(10).fill(0)); // State to manage progress bar for each achievement
  const [AchievementStatus, setAchieveStatus] = useState(1); // State to manage achievement status

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

  useEffect(() => {
    if (activeTab === 'tab1') {
      const intervals = progress.map((_, index) => {
        return setInterval(() => {
          setProgress(prevProgress => {
            const newProgress = [...prevProgress];
            if (newProgress[index] < 100) {
              newProgress[index] += 10;
              // Update AchievementStatus based on progress index
            } else {
              clearInterval(intervals[index]);
            }
            return newProgress;
          });
        }, 1000);
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [activeTab, progress]);

  useEffect(() => {
    progress.forEach((value, index) => {
      const achievementImg = document.getElementById(`achievementImg-${index}`);
      if (achievementImg) {
        if (value === 100) {
          achievementImg.classList.remove(styles.grayScale);
        } else {
          achievementImg.classList.add(styles.grayScale);
        }
      }
    });
  }, [progress]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const achievementImages = [
    "https://img.icons8.com/ios-filled/50/000000/star--v1.png",
    "https://img.icons8.com/ios-filled/50/000000/medal.png",
    "https://img.icons8.com/ios-filled/50/000000/medal-second-place.png",
    "https://img.icons8.com/ios-filled/50/000000/trophy.png",
    "https://img.icons8.com/ios-filled/50/000000/certificate.png",
    "https://img.icons8.com/ios-filled/50/000000/cup.png",
    "https://img.icons8.com/ios-filled/50/000000/badge.png",
    "https://img.icons8.com/ios-filled/50/000000/crown.png",
    "https://img.icons8.com/ios-filled/50/000000/like.png",
    "https://img.icons8.com/ios-filled/50/000000/prize.png"
  ];

  return (
    <div className={styles.MyPageMain}>
      <div className={styles.MyPageProfile}>
        <img src={userData.AvatarURL} className={styles.MyAvatar} alt="Avatar" />
        <div className={styles.ProfileInfo}>
        <p>{userData.nickname} <span style={{ fontSize: '0.7em', color: "gray" }}>@{userData.login}</span></p>
          <button onClick={() => setIsModalOpen(true)}>Edit</button>
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
          {activeTab === 'tab1' && (
            <div>
              <div>
                <h3>Achievements</h3>
              </div>
              <div>
                <div className={styles.achievementGrid}>
                  {achievementImages.map((imgSrc, index) => (
                    <div key={index} className={styles.achievementItem}>
                      <img id={`achievementImg-${index}`} src={imgSrc} alt={`Achievement ${index + 1}`} className={styles.grayScale} />
                      <p>{AchievementStatus} / {5 * (index + 1)}</p>
                      <div className={styles.progressBarContainer}>
                        <div id={`progressBar-${index}`} className={styles.progressBar} style={{ width: `${((AchievementStatus / ((index + 1) * 5)) * 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'tab2' && <div>Content for Tab 2</div>}
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
