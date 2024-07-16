import React, { useState, useEffect } from "react";
import axios from 'axios';
import MobileNickname from './MobileNickname'; // Import the MobileNickname component
import styles from './MobileMyPage.module.css'; // Import the CSS module

export default function MobileMyPage({ userData, setUserData }) {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ActStatusCount, setActStatusCount] = useState(0);
  const [PlanStatusCount, setPlanStatusCount] = useState(0);

  useEffect(() => {
  const fetchUserTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/plans', {
        params: {
          login: userData.login
        },
        withCredentials: true
      });

      console.log("Fetched user tasks response:", response.data);

      if (response.data && response.data.length > 0) {
        const { ActStatusCount, PlanStatusCount } = response.data[0];

        console.log("ActStatusCount:", ActStatusCount);
        console.log("PlanStatusCount:", PlanStatusCount);

        setActStatusCount(ActStatusCount);
        setPlanStatusCount(PlanStatusCount);
      }
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  fetchUserTasks();
}, [userData]);



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

  const achievementImages = [
    "https://img.icons8.com/?size=40&id=eECaGPY9nVTa&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=BYrLfXd7xnkT&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=8r7zilMrBUpy&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=Bz1KNLgkXDQO&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=118292&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=WRJDm02u5wNH&format=png&color=000000",
    "https://img.icons8.com/?size=40&id=b4tUwopVU4z2&format=png&color=000000"
  ];

  const achievementNames = [
    "총 Activity 진행 수 5번",
    "총 Activity 진행 수 10번",
    "총 Activity 진행 수 30번",
    "총 Activity 진행 수 50번",
    "총 Activity 진행 수 100번",
    "총 Plan 진행 수 5번",
    "총 Plan 진행 수 10번"
  ];

  const achievementTargets = [5, 10, 30, 50, 100, 5, 10];
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
                      <img
                        id={`achievementImg-${index}`}
                        src={imgSrc}
                        alt={`Achievement ${index + 1}`}
                        className={
                          (index < 5 && ActStatusCount >= achievementTargets[index]) || (index >= 5 && PlanStatusCount >= achievementTargets[index])
                            ? ''
                            : styles.grayScale
                        }
                      />
                      <p>
                        {index < 5 ? ActStatusCount : PlanStatusCount} / {achievementTargets[index]}
                      </p>
                      <div className={styles.progressBarContainer}>
                        <div
                          id={`progressBar-${index}`}
                          className={styles.progressBar}
                          style={{
                            width: `${(index < 5 ? ActStatusCount : PlanStatusCount) / achievementTargets[index] * 100
                              }%`
                          }}
                        ></div>
                      </div>
                      <p>{achievementNames[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'tab2' && <div>기능 추가중..</div>}
        </div>
      </div>

      <div className={styles.s}></div>

      <MobileNickname
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleChangeNickname}
      />
    </div>
  );
}
