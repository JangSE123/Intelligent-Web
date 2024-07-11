import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./MobileGitHub.module.css";

function MobileGitHub({ userData, setUserData }) {
    const [repositories, setRepositories] = useState([]);
    const [commits, setCommits] = useState([]);
    const [commitDetails, setCommitDetails] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);

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
        } catch (error) {
            console.error('Error fetching commit details:', error);
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
                        <p>Welcome, {userData.login}</p>
                        <img src={userData.avatar_url} alt="User Avatar" />
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
                    <div className={styles["commit-details-container"]}>
                        <h2>GPT:</h2>
                        {commitDetails ? (
                            <>
                                <p><strong>Message:</strong> {commitDetails.commit.message}</p>
                                <p><strong>Author:</strong> {commitDetails.commit.author.name} ({commitDetails.commit.author.email})</p>
                                <p><strong>Date:</strong> {new Date(commitDetails.commit.author.date).toLocaleString()}</p>
                                <h3>Files Changed:</h3>
                                <ul>
                                    {commitDetails.files.map(file => (
                                        <li key={file.filename}>
                                            <p><strong>File:</strong> {file.filename}</p>
                                            <p><strong>Changes:</strong> {file.changes}</p>
                                            <p><strong>Status:</strong> {file.status}</p>
                                            <pre>{file.patch}</pre>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>Please select a commit to view details.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Please log in to view your repositories.</p>
            )}
        </div>
    );
}

export default MobileGitHub;
