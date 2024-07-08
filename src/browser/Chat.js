import React, { useState, useEffect, useRef } from 'react';
import Headers from './BrowserHeader'
import styles from './Chat.module.css'

export default function Chat() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    const chatEndRef = useRef(null);

    const questions = [
        "공부할 언어를 선택해주세요",
        "공부할 기간을 선택해주세요",
        "하루에 공부할 시간을 선택해주세요",
        "공부할 개발과정을 선택해주세요"
    ];

    const options = {
        1: ["Python", "Java", "C"],
        2: ["7일", "15일", "30일"],
        3: ["1시간", "2시간", "3시간"],
        4: ["초급", "중급", "고급"]
    };

    const handleAnswer = (answer) => {
        setAnswers([...answers, { question: questions[step - 1], answer }]);
        setStep(step + 1);
    };

    const renderOptions = () => {
        return options[step].map(option => (
            <div className={styles.answer} onClick={() => handleAnswer(option)} key={option}>
                {option}
            </div>
        ));
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [answers]);

    return (
        <div className={styles.ChatMain}>
            <Headers />
            <div className={styles.chatContainer}>
                <div className={styles.bubblesContainer}>
                    {answers.map((qa, index) => (
                        <div key={index} className={styles.bubbleContainer}>
                            <div className={styles.questionBubble}>{qa.question}</div>
                            <div className={`${styles.answerBubble} ${styles.rightAlign}`}>{qa.answer}</div>
                        </div>
                    ))}
                    {step <= questions.length && (
                        <div className={styles.bubbleContainer}>
                            <div className={styles.questionBubble}>{questions[step - 1]}</div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {step <= questions.length && (
                    <div className={styles.answerOptions}>
                        {renderOptions()}
                    </div>
                )}
            </div>
        </div>
    )
}