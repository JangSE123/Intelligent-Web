import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileMain from './MobileMain';
import styles from './MobileApp.module.css';

function MobileApp(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className={isMenuOpen ? styles.blurred : ''}>
                <MobileMain />
            </div>
            {isMenuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
        </div>
    );
}

export default MobileApp;
