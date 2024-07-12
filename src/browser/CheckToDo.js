import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CheckToDo.module.css';

export default function CheckToDo(props) {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [comparisonResult, setComparisonResult] = useState(null);
    const [parsedResponse, setParsedResponse] = useState(null); // 학습 계획 데이터
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);

    const userData = props.userData;

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/config');
                setApiKey(response.data.gptApiKey);
            } catch (error) {
                console.error("Error fetching API key: ", error);
            }
        };

        fetchApiKey();
    }, []);

    const fetchRepos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/github/repos', { withCredentials: true });
            setRepos(response.data);
        } catch (error) {
            console.error("Error fetching repositories: ", error);
        }
    };

    const fetchFiles = async (owner, repo) => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`, {
                headers: {
                    Authorization: `token ${userData.access_token}`,
                },
            });
            setFiles(response.data);
            setSelectedRepo({ owner, repo });
        } catch (error) {
            console.error("Error fetching files: ", error);
        }
    };

    const comparePlanWithRepo = async (owner, repo, filePath) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/compare-plan', {
                repoOwner: owner,
                repoName: repo,
                filePath: filePath,
                userPlan: parsedResponse // 학습 계획 데이터
            });
            setComparisonResult(response.data.match);
        } catch (error) {
            console.error("Error comparing plan with repo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.CheckPlannerMain}>
            <h1 className={styles.title}>Check Planner</h1>
            <button className={styles.button} onClick={fetchRepos}>Fetch Repositories</button>
            <ul className={styles.repoList}>
                {repos.map((repo) => (
                    <li className={styles.repoItem} key={repo.id} onClick={() => fetchFiles(repo.owner.login, repo.name)}>
                        {repo.name}
                    </li>
                ))}
            </ul>
            {files.length > 0 && (
                <ul className={styles.fileList}>
                    {files.map((file) => (
                        <li className={styles.fileItem} key={file.sha} onClick={() => comparePlanWithRepo(selectedRepo.owner.login, selectedRepo.repo, file.path)}>
                            {file.name}
                        </li>
                    ))}
                </ul>
            )}
            {isLoading && <p className={styles.loading}>Loading...</p>}
            {comparisonResult !== null && (
                <div className={styles.result}>
                    {comparisonResult ? "The file matches the learning plan!" : "The file does not match the learning plan."}
                </div>
            )}
        </div>
    );
}
