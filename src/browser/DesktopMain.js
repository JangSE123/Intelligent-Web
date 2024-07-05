<<<<<<< HEAD
import React from 'react';
import styles from './DesktopMain.module.css';

function DesktopMain(props) {
    return (
        <div className={styles.DesktopMain}>
           <div className={styles.main}>
            
           </div>
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
        </div>
    </div>
  )
}

export default DesktopMain;
