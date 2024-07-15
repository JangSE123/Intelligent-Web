import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./MobileGitHub.module.css";

function MobileGitHub({ userData, setUserData }) {
    const [repositories, setRepositories] = useState([]);
    const [commits, setCommits] = useState([]);
    const [commitDetails, setCommitDetails] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [gptSummary, setGptSummary] = useState("");
    const [loadingGPT, setLoadingGPT] = useState(false); // GPT 로딩 상태 추가
    const [activeTab, setActiveTab] = useState("commitDetails"); // 기본 탭 설정

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
            const response = await axios.get('http://localhost:5001/api/github/repos', { withCredentials: true });
            setRepositories(response.data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    const fetchCommits = async (owner, repo) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/github/repos/${owner}/${repo}/commits`, { withCredentials: true });
            setCommits(response.data);
            setSelectedRepo(repo);
            setCommitDetails(null);
        } catch (error) {
            console.error('Error fetching commits:', error);
        }
    };

    const fetchCommitDetails = async (owner, repo, sha) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/github/repos/${owner}/${repo}/commits/${sha}`, { withCredentials: true });
            setCommitDetails(response.data);
            setGptSummary(""); // 커밋 상세 정보를 새로 받으면 GPT 요약 초기화
            setActiveTab("commitDetails"); // Commit Details 탭으로 전환
        } catch (error) {
            console.error('Error fetching commit details:', error);
        }
    };

    const summarizeCommitDetails = async () => {
        if (!commitDetails) return;

        setActiveTab("gptChat"); // GPT 요약 결과를 보기 위해 GPT Chat 탭으로 전환
        setLoadingGPT(true); // GPT 로딩 시작
        setCommitDetails(null); // Commit Details 초기화

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
        } catch (error) {
            console.error("Error summarizing commit details:", error.message);
        } finally {
            setLoadingGPT(false); // GPT 로딩 종료
        }
    };

    const handleRepoChange = (selectedOption) => {
        if (selectedOption) {
            fetchCommits(userData.login, selectedOption.value);
        }
    };

    const handleCommitChange = (selectedOption) => {
        if (selectedOption) {
            fetchCommitDetails(userData.login, selectedRepo, selectedOption.value);
        }
    };

    const repoOptions = repositories.map((repo) => ({
        value: repo.name,
        label: repo.name
    }));

    const commitOptions = commits.map((commit) => ({
        value: commit.sha,
        label: `${commit.commit.message} - ${new Date(commit.commit.author.date).toLocaleString()}`
    }));

    return (
        <div className={styles["github-body"]}>
            {userData ? (
                <>
                    <div className={styles["user-info"]}>
                        <p>Welcome, {userData.nickname}</p>
                        <img src={userData.AvatarURL} className={styles.MyAvatar} alt="Avatar" />
                    </div>
                    <div className={styles["repos-container"]}>
                        <h2>Repositories:</h2>
                        <Select
                            options={repoOptions}
                            onChange={handleRepoChange}
                            placeholder="Select a repository"
                        />
                    </div>
                    <div className={styles["commits-container"]}>
                        <h2>Commits for {selectedRepo || '...'}</h2>
                        {selectedRepo ? (
                            <Select
                                options={commitOptions}
                                onChange={handleCommitChange}
                                placeholder="Select a commit"
                            />
                        ) : (
                            <p>Please select a repository to view commits.</p>
                        )}
                    </div>
                    <div>
                        <div className={styles.ToggleContainer}>
                            <div
                                className={`${styles.ToggleButton} ${
                                    activeTab === "gptChat" ? styles.active : ""
                                }`}
                                onClick={() => setActiveTab("gptChat")}
                            >
                            </div>
                        </div>
                        
                            <div className={styles.DetailHeader}>
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
                                    
                                </div>
                            )}
                        <div className={`${styles.CommitGpt} 
                        ${activeTab === "gptChat" ? styles.active : ""}`}>
                            <h3 className={styles.DetailTitle}>GPT 요약내용:</h3>
                            {loadingGPT ? ( // 로딩 중일 때 스피너 표시
                                <div className={styles.spinner}></div>
                            ) : (
                                <div>
                                    {gptSummary ? (
                                        <div dangerouslySetInnerHTML={{ __html: gptSummary }} />
                                    ) : (
                                        <p>요약내용이 여기에 표시됩니다.</p>
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
    );
}

export default MobileGitHub;
