import React from 'react';
import styles from './BrowserHeader.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className={styles.topbar}>
                <span className={styles.logo}>
                    <Link to = "/">Coding Mate</Link>
                </span>
                <div className={styles.content}>
                    <ul className={styles.menu}>
                        <li className={styles.list}>
                            Planner
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>
                                    <Link to = "/planner-chat">Plan Crafter</Link>
                                </li>
                                <li className={styles.sub}>
                                    <Link to="/planner_calendar">Calendar</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            GitHub
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>
                                    <Link to="/check-todo">Check To Do</Link>
                                </li>
                                <li className={styles.sub}>
                                    <Link to="/git-connection">Summarizer</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            Help
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>
                                    <Link to="/help-docs">도움말</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            MyPage
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>
                                    <Link to="/my-page">MyPage</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
