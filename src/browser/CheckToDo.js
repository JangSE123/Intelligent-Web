import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CheckToDo.module.css";
import Swal from 'sweetalert2';


const defaultFolderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="16"
    height="16"
  >
    <path
      fill="#FFD43B"
      d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
    />
  </svg>
);

const selectedFolderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width="16"
    height="16"
  >
    <path
      fill="#E9B62B"
      d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"
    />
  </svg>
);

const fileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width="16"
    height="16"
  >
    <path
      fill="#7A7A7A"
      d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
    />
  </svg>
);

function CheckToDo({userData, setUserData}) {
  const [repos, setRepos] = useState([]);
  const [contents, setContents] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [currentRepo, setCurrentRepo] = useState(null);
  const [path, setPath] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskName, setSelectedTaskName] = useState("");

  useEffect(() => {
    if (userData) {
      const today = new Date();
      fetchTasks(userData.login, today);
    }
  }, [userData]);

  const fetchTasks = (login, date) => {
    const formattedDate = date.toISOString().split('T')[0];
    axios.get(`http://localhost:5001/api/tasks?login=${login}&date=${formattedDate}`)
      .then(response => {
        const filteredTasks = response.data.filter(task => !task.status);
        setTasks(filteredTasks);
        console.log('Tasks fetched successfully:', filteredTasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    console.log('Tasks state updated:', tasks);
  }, [tasks]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/github/repos",
        {
          withCredentials: true,
        }
      );
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error.message);
      console.error("Full error object:", error);
    }
  };

  const fetchContents = async (repo, path = "") => {
    try {
      setCurrentRepo(repo);
      setPath(path);
      const response = await axios.get(
        `http://localhost:5001/api/repos/${repo}/contents`,
        {
          params: { path },
          withCredentials: true,
        }
      );
      setContents(response.data);
      setFileContent(null);
      setSelectedRepo(repo);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const fetchFileContent = async (repo, path) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/repos/${repo}/contents/file`,
        {
          params: { path },
          withCredentials: true,
        }
      );

      // Base64로 인코딩된 파일 내용을 디코딩
      const binaryString = atob(response.data.content);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decodedContent = new TextDecoder('utf-8').decode(bytes);
      setFileContent(decodedContent);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };


  const goUpDirectory = () => {
    const newPath = path.split("/").slice(0, -1).join("/");
    fetchContents(currentRepo, newPath);
  };
  const handleTaskChange = (event) => {
    const [id, name] = event.target.value.split('!');
    setSelectedTaskId(id);
    setSelectedTaskName(name);
    console.log('선택한 작업 ID:', id);
    console.log('선택한 작업 이름:', name);
  };
  const handleCheckTask = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/check-task", {
        id: selectedTaskId,
        name: selectedTaskName,
        fileContent,
      });
  
      // 서버에서 반환한 응답 데이터 확인
      const responseData = JSON.parse(response.data);
      console.log(responseData); // 전체 응답 데이터 확인
      console.log(responseData.answer); // "True" 또는 "False" 출력
      console.log(responseData.feedback); // 피드백 문자열 출력
      if (responseData.answer === true) {
        Swal.fire({
          icon: 'success',
          title: '일치합니다!',
          html: `<div style="text-align: left;">${responseData.feedback}</div>`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '일치하지 않습니다.',
          html: `<div style="text-align: left;">${responseData.feedback}</div>`,
        });
      }
      // 필요한 처리 작업 추가
  
    } catch (error) {
      console.error("Error checking task:", error.response ? error.response.data : error.message);
    }
  };
  
  
  

  return (
    <div className={styles.MainContainer}>
      <h1>GitHub Repository Explorer</h1>

      <div className={styles.totalContainer}>
        <div className={styles.PathContainer}>
          <div className={styles.RepoContainer}>
            <h2>Repositories</h2>
            {repos.map((repo) => (
              <div
                style={{ cursor: "pointer" }}
                key={repo.id}
                onClick={() => fetchContents(repo.name)}
              >
                {repo.name === selectedRepo
                  ? selectedFolderIcon
                  : defaultFolderIcon}{" "}
                {repo.name}
              </div>
            ))}
          </div>

          <div className={styles.ContentContainer}>
            <h2>Contents</h2>
            {path && (
              <div style={{ cursor: "pointer" }} onClick={goUpDirectory}>
                {defaultFolderIcon} ..
              </div>
            )}
            {contents.map((item) => (
              <div
                style={{ cursor: "pointer" }}
                key={item.sha}
                onClick={() =>
                  item.type === "file"
                    ? fetchFileContent(currentRepo, item.path)
                    : fetchContents(currentRepo, item.path)
                }
              >
                {item.type === "dir"
                  ? item.path === path
                    ? selectedFolderIcon
                    : defaultFolderIcon
                  : fileIcon}{" "}
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.SecondContainer}>
          <div className={styles.SelectToDoContainer}>
            <h2>Select Study Plan</h2>
            <select className={styles.selectToDoBox} name="selectedTask" id="selectedTask" onChange={handleTaskChange}>
              <option value="">Select a task...</option>
              {tasks.map(task => (
                <option key={task.id} value={`${task.id}!${task.name}`}>
                  {task.name}
                </option>
              ))}
            </select>

            <button className={styles.sendGPTBtn} onClick={handleCheckTask}> 검사받기 </button>
          </div>
          <div className={styles.FileContainer}>
            <div className={styles.FileTitle}>
              <h2>File Content</h2>
              
            </div>
            <div className={styles.FileDetailContainer}>
              {fileContent && <pre>{fileContent}</pre>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckToDo;
