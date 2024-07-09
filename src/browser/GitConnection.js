// MobileGitHub.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GitConnection.module.css";

function GitConnection({ userData, setUserData }) {
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
            const response = await axios.get('http://localhost:5000/api/github/repos', { withCredentials: true });
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

    return (
        <div className={styles["github-body"]}>
            {userData ? (
                <>
                    <div className={styles["user-info"]}>
                        <p>Welcome, {userData.login}</p>
                    </div>
                    <div className={styles["repos-container"]}>
                        <h2>Repositories:</h2>
                        {repositories.length > 0 ? (
                            <ul>
                                {repositories.map((repo) => (
                                    <li key={repo.id} onClick={() => fetchCommits(userData.login, repo.name)}>
                                        <a href="#">{repo.name}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No repositories found.</p>
                        )}
                    </div>
                    {selectedRepo && (
                        <div className={styles["commits-container"]}>
                            <h2>Commits for {selectedRepo}:</h2>
                            {commits.length > 0 ? (
                                <ul>
                                    {commits.map((commit) => (
                                        <li key={commit.sha} onClick={() => fetchCommitDetails(userData.login, selectedRepo, commit.sha)}>
                                            <p>{commit.commit.message}</p>
                                            <p><small>{commit.commit.author.name} - {new Date(commit.commit.author.date).toLocaleString()}</small></p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No commits found.</p>
                            )}
                        </div>
                    )}
                    {commitDetails && (
                        <div className={styles["commit-details-container"]}>
                            <h2>Commit Details:</h2>
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
                        </div>
                    )}
                </>
            ) : (
                <p>Please log in to view your repositories.</p>
            )}
        </div>
    );
}

export default GitConnection;
