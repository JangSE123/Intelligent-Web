import React from 'react';
import styles from './BrowserHeader.module.css';

const Header = () => {
    return (
        <header>
            <div className={styles.topbar}>
                <span className={styles.logo}>Code Gardener</span>
                <div className={styles.content}>
                    <ul className={styles.menu}>
                        <li className={styles.list}>
                            Planner
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>PlannerChat</li>
                                <li className={styles.sub}>Calendar</li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            Git
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>Develop</li>
                                <li className={styles.sub}>Git Connection</li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            Help
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>도움말</li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            MyPage
                            <ul className={styles.submenu}>
                                <li className={styles.sub}>Grass Custom</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;