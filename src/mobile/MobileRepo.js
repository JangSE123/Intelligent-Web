import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import styles from "./GitRepo.module.css";

function MobileRepo() {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get("login");
    const avatarUrl = urlParams.get("avatar_url");

    if (login && avatarUrl) {
      setUserData({ login, avatar_url: avatarUrl });
      sessionStorage.setItem("github_user_login", login);
      sessionStorage.setItem("github_user_avatar_url", avatarUrl);
      fetchRepositories();
    }
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/github/repos', { withCredentials: true });
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  return (
    // <div className={styles["repo-body"]}>
    //   <p>Repositories PAGE</p>
    //   <div className={styles["repo-container"]}>
    <div>
      <p>Repositories PAGE</p>
      <div>
        <h2>{userData?.login}'s Repositories:</h2>
        {repositories.length > 0 ? (
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>
                <Link to={`/commits?owner=${userData.login}&repo=${repo.name}`}>{repo.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found.</p>
        )}
      </div>
    </div>
  );
}

export default MobileRepo;
