import React, { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
// import styles from "./GitCommit.module.css";

function MobileCommit() {
  const [commits, setCommits] = useState([]);
  const [commitDetails, setCommitDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const owner = urlParams.get("owner");
    const repo = urlParams.get("repo");

    if (owner && repo) {
      fetchCommits(owner, repo);
    }
  }, []);

  const fetchCommits = async (owner, repo) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/github/repos/${owner}/${repo}/commits`, { withCredentials: true });
      setCommits(response.data);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  const fetchCommitDetails = async (owner, repo, sha) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/github/repos/${owner}/${repo}/commits/${sha}`, { withCredentials: true });
      setCommitDetails(response.data);
    } catch (error) {
      console.error('Error fetching commit details:', error);
    }
  };

  const handleCommitClick = (sha) => {
    const urlParams = new URLSearchParams(window.location.search);
    const owner = urlParams.get("owner");
    const repo = urlParams.get("repo");
    fetchCommitDetails(owner, repo, sha);
  };

  return (
    // <div className={styles["commit-body"]}>
    //   <p>Commits PAGE</p>
    //   <div className={styles["commit-container"]}>
    <div>
      <p>Commits PAGE</p>
      <div>
        <h2>Commits:</h2>
        {commits.length > 0 ? (
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>
                <Link to="#" onClick={() => handleCommitClick(commit.sha)}>
                  {commit.commit.message}
                </Link>
                <p><small>{commit.commit.author.name} - {new Date(commit.commit.author.date).toLocaleString()}</small></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No commits found.</p>
        )}
        {commitDetails && (
        //   <div className={styles["commit-details-container"]}>
          <div>
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
      </div>
    </div>
  );
}

export default MobileCommit;
