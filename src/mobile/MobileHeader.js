// MobileHeader.js
import React from 'react';
import styles from './MobileHeader.module.css';
import { Link } from 'react-router-dom';

function MobileHeader({ userData, isMenuOpen, toggleMenu }) {
    return (
        <header className={styles.header}>
            <p>Code Garden</p>
            <div className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav className={`${styles.navbar} ${isMenuOpen ? styles.show : styles.hide}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/github">GitHub</Link></li>
                    <li><Link to="/planner">Planner</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li><Link to="/mypage">MyPage</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MobileHeader;
