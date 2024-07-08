import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileMain from './MobileMain';
import styles from './MobileApp.module.css';
import MakePlan from './MakePlan';

function MobileApp(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // State to track the current page

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false); // Close menu after navigation
    };

    return (
        <div>
            <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} onNavigate={handleNavigation} />
            <div className={isMenuOpen ? styles.blurred : ''}>
                {currentPage === 'home' && <MobileMain />}
                {currentPage === 'planner' && <MakePlan />}
            </div>
            {isMenuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
        </div>
    );
}

export default MobileApp;
