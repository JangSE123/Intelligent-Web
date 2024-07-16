import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.css";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import GitHubCalendar from "react-github-calendar";
import axios from "axios";

function MainContent({ userData, setUserData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchSessionUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/session-user",
          { withCredentials: true }
        );
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching session user data:", error);
      }
    };

    fetchSessionUserData();
  }, [setUserData]);

  useEffect(() => {
    if (userData && selectedDate) {
      fetchTasks(userData.login, selectedDate);
    }
  }, [userData, selectedDate]);

  const fetchTasks = (login, date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const test = 1;
    axios
      .get(
        `http://localhost:5001/api/tasks?login=${login}&date=${formattedDate} &test=${test}`
      )
      .then((response) => {
        setTasks(response.data);
        console.log("Tasks fetched successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login/github";
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:5001/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUserData(null);
        window.location.href = "http://localhost:3000";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const selectMonth = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 4;

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles["login-container"]}>
            {!userData ? (
              <button style={{display:"flex", alignItems:"center", justifyContent:"center"}} onClick={handleLogin}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  marginTop="1px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                &nbsp;&nbsp;&nbsp;
                <b>Login with GitHub</b>
              </button>
            ) : (
              <>
                {userData && (
                  <div className={styles["profile-container"]}>
                    <img src={userData.AvatarURL} alt="Avatar" />
                    <p>
                      {userData.nickname}{" "}
                      <span style={{ fontSize: "0.7em", color: "gray" }}>
                        @{userData.login}
                      </span>
                    </p>
                  </div>
                )}
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
          {userData && (
            <div className={styles.calendarContainer}>
              <GitHubCalendar
                colorScheme="light"
                username={userData.login}
                blockSize={18}
                transformData={selectMonth}
                hideColorLegend
                hideTotalCount
              />
            </div>
          )}
          <div className={styles.calendar}>
            <Calendar
              login={userData ? userData.login : null}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
        <div className={styles["content-area"]}>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            selectedDate={selectedDate}
          />
        </div>
        <div className={styles["Ad-area"]}>광고</div>
      </div>
    </div>
  );
}

export default MainContent;
