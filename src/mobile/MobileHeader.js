import React from 'react';
import styles from './MobileHeader.module.css';

function MobileHeader({ isMenuOpen, toggleMenu }) {
    return (
        <>
            <header className={styles.header}>
                <p>Code Garden</p>
                <div className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <nav className={`${styles.navbar} ${isMenuOpen ? styles.show : styles.hide}`}>
                <ul>
                    <li>Git</li>
                    <li>Planner</li>
                    <li>Help</li>
                    <li>MyPage</li>
                </ul>
            </nav>
        </>
    );
}

export default MobileHeader;
