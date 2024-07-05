<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 33ac7f4 (feat(main))
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
=======
import React from 'react';
import styles from './DesktopMain.module.css';
>>>>>>> 8874dd3 (Header 추가)

    return (
<<<<<<< HEAD
        <div className={styles.main}>
            <div className={styles.section}>
                <div className={styles.image} />
            </div>
            <div className={styles.section}>
                <div className={styles.content}>
                    <h1>메인 내용</h1>
                </div>
            </div>
            <div className={styles.section}>
                <section className={styles.nextSection}>
                    <h2>다음 화면 1</h2>
                    <p>여기에 다음 화면의 내용이 들어갑니다.</p>
                </section>
            </div>
            <div className={styles.section}>
                <section className={styles.nextSection}>
                    <h2>다음 화면 2</h2>
                    <p>여기에 추가적인 내용이 들어갑니다.</p>
                </section>
            </div>
=======
        <div className={styles.DesktopMain}>
           <div className={styles.main}>
            
           </div>
<<<<<<< HEAD
>>>>>>> 8874dd3 (Header 추가)
=======
=======
import React, { useState } from 'react'
import styles from './DesktopMain.module.css'
// import image1 from './a.jpg'
// import image2 from './b.jpg'

function DesktopMain() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [imageHeight, setImageHeight] = useState('100vh');

    const handleScroll = () => {
        const position = window.scrollY;

        if(position > 0) {
            setImageHeight('0');
        } else {
            setImageHeight('100vh');
        }
        setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

  return (
    <div className={styles.main}>
        <div className={styles.image} style={{ height: imageHeight }}/>
        <div className={`${styles.content} ${scrollPosition > 0 ? styles.show : ''}}`}>
            {}
            <h1>메인 내용</h1>
>>>>>>> c20677a (feat(main))
>>>>>>> 33ac7f4 (feat(main))
        </div>
    </div>
  )
}

export default DesktopMain;
