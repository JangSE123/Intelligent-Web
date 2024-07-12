import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GitConnection.module.css";
import "./GitConnection.css"

function GitConnection({ userData, setUserData }) {
  const [repositories, setRepositories] = useState([]);
  const [commits, setCommits] = useState([]);
  const [commitDetails, setCommitDetails] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [activeTab, setActiveTab] = useState("commitDetails");
  const [gptSummary, setGptSummary] = useState("");
  const [loadingGPT, setLoadingGPT] = useState(false); // GPT 로딩 상태 추가

  useEffect(() => {
    if (userData) {
      fetchRepositories();
    } else {
      const login = sessionStorage.getItem("github_user_login");
      const avatarUrl = sessionStorage.getItem("github_user_avatar_url");
      if (login && avatarUrl) {
        setUserData({ login, avatar_url: avatarUrl });
        fetchRepositories();
      }
    }
  }, [userData]);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/github/repos",
        { withCredentials: true }
      );
      setRepositories(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error.message);
      console.error("Full error object:", error);
    }
  };

  const fetchCommits = async (owner, repo) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/github/repos/${owner}/${repo}/commits`,
        { withCredentials: true }
      );
      setCommits(response.data);
      setSelectedRepo(repo);
      setCommitDetails(null);
      setActiveTab("commitDetails"); // Commit Details 탭으로 전환
    } catch (error) {
      console.error("Error fetching commits:", error.message);
      console.error("Full error object:", error);
    }
  };

  const fetchCommitDetails = async (owner, repo, sha) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/github/repos/${owner}/${repo}/commits/${sha}`,
        { withCredentials: true }
      );
      console.log("Commit Details:", response.data);
      setCommitDetails(response.data);
      setActiveTab("commitDetails"); // Commit Details 탭으로 전환
    } catch (error) {
      console.error("Error fetching commit details:", error);
    }
  };

  const summarizeCommitDetails = async () => {
    if (!commitDetails) return;

    setActiveTab("gptChat"); // GPT 요약 결과를 보기 위해 GPT Chat 탭으로 전환
    setLoadingGPT(true); // GPT 로딩 시작

    const commitDetailsString = JSON.stringify(commitDetails, null, 2);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/summarize",
        {
          commitDetails: commitDetailsString,
        },
        { withCredentials: true }
      );
      setGptSummary(response.data.summary);
      console.log(gptSummary);
    } catch (error) {
      console.error("Error summarizing commit details:", error.message);
    } finally {
      setLoadingGPT(false); // GPT 로딩 종료
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container}>
        {userData ? (
          <>
            <div className={styles.Repositories}>
              <h3 className={styles.RepoTitle}>Repositories:</h3>
              {repositories.length > 0 ? (
                <ul>
                  {repositories.map((repo) => (
                    <li
                      className={styles.repoTab}
                      key={repo.id}
                      onClick={() => fetchCommits(userData.login, repo.name)}
                    >
                      <a href="#">{repo.name}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No repositories found.</p>
              )}
            </div>
            <div className={styles.CommitList}>
              <h3 className={styles.CommitTitle}>Commits {selectedRepo}:</h3>
              {selectedRepo && (
                <>
                  {commits.length > 0 ? (
                    <ul>
                      {commits.map((commit) => (
                        <li
                          className={styles.commitTab}
                          key={commit.sha}
                          onClick={() =>
                            fetchCommitDetails(
                              userData.login,
                              selectedRepo,
                              commit.sha
                            )
                          }
                        >
                          <p style={{ fontWeight: "bold" }}>
                            {commit.commit.message}
                          </p>
                          <p>
                            <small>
                              {commit.commit.author.name} -{" "}
                              {new Date(
                                commit.commit.author.date
                              ).toLocaleString()}
                            </small>
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No commits found.</p>
                  )}
                </>
              )}
            </div>
            <div>
              <div className={styles.ToggleContainer}>
                <div
                  className={`${styles.ToggleButton} ${
                    activeTab === "commitDetails" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("commitDetails")}
                >
                  Commit Details
                </div>
                <div
                  className={`${styles.ToggleButton} ${
                    activeTab === "gptChat" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("gptChat")}
                >
                  GPT Chat
                </div>
              </div>
              <div
                className={`${styles.CommitDetail} ${
                  activeTab === "commitDetails" ? styles.active : ""
                }`}
              >
                <div className={styles.DetailHeader}>
                  <h3 className={styles.DetailTitle}>Commit Details:</h3>
                  {commitDetails && (
                    <button
                      onClick={summarizeCommitDetails}
                      className={styles.gptButton}
                    >
                      GPT 요약
                    </button>
                  )}
                </div>
                {commitDetails && (
                  <div className={styles.DetailContainer}>
                    <p>
                      <strong>Message:</strong> {commitDetails.commit.message}
                    </p>
                    <p>
                      <strong>Author:</strong>{" "}
                      {commitDetails.commit.author.name} (
                      {commitDetails.commit.author.email})
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        commitDetails.commit.author.date
                      ).toLocaleString()}
                    </p>
                    <h3>Files Changed:</h3>
                    <ul className={styles.commitDetailsUl}>
                      {commitDetails.files.map((file) => (
                        <li key={file.filename}>
                          <p>
                            <strong>File:</strong> {file.filename}
                          </p>
                          <p>
                            <strong>Changes:</strong> {file.changes}
                          </p>
                          <p>
                            <strong>Status:</strong> {file.status}
                          </p>
                          <pre>{file.patch}</pre>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={`${styles.CommitGpt} 
              ${activeTab === "gptChat" ? styles.active : ""}`}>
                <h3 className={styles.DetailTitle}>GPT Chat:</h3>
                {loadingGPT ? ( // 로딩 중일 때 스피너 표시
                  <div className={styles.spinner}></div>
                ) : (
                  <div>
                    {gptSummary ? (
                      <div dangerouslySetInnerHTML={{ __html: gptSummary }} />
                    ) : (
                      <p>GPT Chat content will be displayed here.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Please log in to view your repositories.</p>
        )}
      </div>
    </div>
  );
}

export default GitConnection;
