import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import styles from "./Develop.module.css";

export default function Develop() {
  const [repos, setRepos] = useState([]);
  const username = "hanjunnn";
  const token = "준이 토큰 ㅎㅎ";

  useEffect(() => {
    const fetchRepos = async () => {
      const octokit = new Octokit({
        auth: token,
      });

      try {
        const response = await octokit.repos.listForUser({
          username,
        });
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, [username, token]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.container}>
        <div className={styles.Repositories}>
          <h1>Repositories of {username}</h1>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.Commit}>커밋목록</div>
        <div className={styles.CommitCode}>
          코드
          <div className={styles.CommitGpt}>지피티</div>
        </div>
      </div>
    </div>
  );
}
