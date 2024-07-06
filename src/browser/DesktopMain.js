import React, { useEffect, useState } from 'react';
import MainContent from './MainContent';
import 'react-calendar/dist/Calendar.css';
import styles from './DesktopMain.module.css';

function DesktopMain() {
    useEffect(() => {
        // Function to handle scroll snapping effect
        const handleScroll = () => {
            const position = window.scrollY;
            const main = document.querySelector(`.${styles.main}`);

            // Update the body's scroll snapping behavior
            if (position === 0) {
                main.style.scrollSnapType = 'none';
            } else {
                main.style.scrollSnapType = 'y mandatory';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.section}>
                <div className={styles.image} />
            </div>
            <div className={styles.section}>
                <div className={styles.content}>
                    <MainContent />
                </div>
            </div>
            <div className={styles.section}>
            </div>
            <div className={styles.section}>
                <section className={styles.nextSection}>
                    <h2>다음 화면 2</h2>
                    <p>여기에 추가적인 내용이 들어갑니다.</p>
                </section>
            </div>
        </div>
    );
}

export default DesktopMain;
