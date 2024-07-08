import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import styles from './Develop.module.css'; 

export default function Develop() {
  const [repos, setRepos] = useState([]);
  const username = 'hanjunnn';
  const token = '준이 토큰 ㅎㅎ'; // 여기서 Personal Access Token을 사용하세요

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
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepos();
  }, [username, token]);

  return (
    <div className={styles.body}>
      <h1>Repositories of {username}</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}