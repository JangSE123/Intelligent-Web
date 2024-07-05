import React from 'react';
import styles from './BrowserHeader.module.css';

const Header = () => {
    return (
        <header>
            <div className={styles['bh-topbar']}>
                <span className={styles['bh-logo']}>Code Gardener</span>
                <div className={styles['bh-content']}>
                    <ul className={styles['bh-menu']}>
                        <li className={styles['bh-list']}>
                            Planner
                            <ul className={styles['bh-submenu']}>
                                <li className={styles['bh-sub']}>PlannerChat</li>
                                <li className={styles['bh-sub']}>Calendar</li>
                            </ul>
                        </li>
                        <li className={styles['bh-list']}>
                            Git
                            <ul className={styles['bh-submenu']}>
                                <li className={styles['bh-sub']}>Develop</li>
                                <li className={styles['bh-sub']}>Git Connection</li>
                            </ul>
                        </li>
                        <li className={styles['bh-list']}>
                            Help
                            <ul className={styles['bh-submenu']}>
                                <li className={styles['bh-sub']}>도움말</li>
                            </ul>
                        </li>
                        <li className={styles['bh-list']}>
                            MyPage
                            <ul className={styles['bh-submenu']}>
                                <li className={styles['bh-sub']}>Grass Custom</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
