import {React, useState} from 'react';
import styles from './MobileHeader.module.css';

function MobileHeader(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <header className={styles.header}>
                <p>Code Garden</p>
                <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <nav>
                <div>
                    scroll Hide See Place
                </div>
            </nav>
        </>
    );
}

export default MobileHeader;