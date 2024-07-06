import React from 'react'
import Headers from './BrowserHeader'
import styles from './Chat.module.css'

export default function Chat() {
  return (
    <div className={styles.ChatMain}>
        <Headers />
        <div className={styles.ChatSection}>
            <div className={styles.ChatScroll}>
                <div class={styles.pull}>공부할 언어를 선택해주세요</div>

            </div>

            <div className={styles.buttons}>
                <button className={styles.btn}>C</button>
                <button className={styles.btn}>Python</button>
                <button className={styles.btn}>Java</button>
                <button className={styles.btn}>C#</button>
            </div>

            <div className={styles.ChatBox}>
                <input type="text" className={styles.ChatInput} placeholder="메시지를 입력하세요." />
                <button className={styles.ChatButton}>
                    <img className={styles.ChatImage} src="img/chatting.png" />
                </button>
            </div>
        </div>
    </div>
  )
}
