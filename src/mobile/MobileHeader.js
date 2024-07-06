import React from 'react';
import styles from './MobileHeader.module.css';

function MobileHeader({ isMenuOpen, toggleMenu, onNavigate }) {
    return (
        <>
            <header className={styles.header}>
                <p onClick={() => onNavigate('home')}>Code Garden</p>
                <div className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <nav className={`${styles.navbar} ${isMenuOpen ? styles.show : styles.hide}`}>
                <ul>
                    <li onClick={() => onNavigate('git')}>Git</li>
                    <li onClick={() => onNavigate('planner')}>Planner</li>
                    <li onClick={() => onNavigate('help')}>Help</li>
                    <li onClick={() => onNavigate('mypage')}>MyPage</li>
                </ul>
            </nav>
        </>
    );
}

export default MobileHeader;
