import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckToDo() {
    const [repos, setRepos] = useState([]);
    const [contents, setContents] = useState([]);
    const [fileContent, setFileContent] = useState(null);
    const [currentRepo, setCurrentRepo] = useState(null);

    useEffect(() => {
        fetchRepositories();
    }, []);

    const fetchRepositories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/github/repos", {
                withCredentials: true
            });
            setRepos(response.data);
        } catch (error) {
            console.error("Error fetching repositories:", error.message);
            console.error("Full error object:", error);
        }
    };

    const fetchContents = async (repo, path = '') => {
        try {
            setCurrentRepo(repo);
            const response = await axios.get(`http://localhost:5001/api/repos/${repo}/contents`, {
                params: { path },
                withCredentials: true
            });
            setContents(response.data);
            setFileContent(null);
        } catch (error) {
            console.error("Error fetching contents:", error);
        }
    };

    const fetchFileContent = async (repo, path) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/repos/${repo}/contents/file`, {
                params: { path },
                withCredentials: true
            });
            setFileContent(atob(response.data.content));
        } catch (error) {
            console.error("Error fetching file content:", error);
        }
    };

    return (
        <div style={{ marginTop: "160px" }}>
            <h1>GitHub Repository Explorer</h1>

            <div>
                <h2>Repositories</h2>
                {repos.map((repo) => (
                    <div style={{cursor:"pointer"}} key={repo.id} onClick={() => fetchContents(repo.name)}>
                        📁 {repo.name}
                    </div>
                ))}
            </div>

            <div>
                <h2>Contents</h2>
                {contents.map((item) => (
                    <div style={{cursor:"pointer"}} key={item.sha} onClick={() => item.type === 'file' ? fetchFileContent(currentRepo, item.path) : fetchContents(currentRepo, item.path)}>
                        {item.type === 'dir' ? '📁' : '📄'} {item.name}
                    </div>
                ))}
            </div>

            {fileContent && (
                <div>
                    <h2>File Content</h2>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
}

export default CheckToDo;
