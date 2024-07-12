import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Headers from './BrowserHeader';
import styles from './Chat.module.css';
import getChatChain from './Langchain';

export default function Chat(props) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const userData = props.userData;
    const chatEndRef = useRef(null);

    const questions = [
        "공부할 언어를 선택해주세요",
        "공부할 기간을 선택해주세요",
        "하루에 공부할 시간을 선택해주세요"
    ];

    const options = {
        1: ["Python", "Java", "C"],
        2: ["7일", "14일", "21일"],
        3: ["1시간", "2시간", "3시간"],
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

    const fetchChatGPTResponse = async (finalAnswers) => {
        setIsLoading(true);
        if (!userData || !userData.login) {
            console.error('User data is not available.');
            setIsLoading(false);
            return;
        }

        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const chain = await getChatChain();
            
            console.log("Final Answers: ", finalAnswers);
            console.log("Chain: ", chain);
            
            const userMessage = await chain.user(finalAnswers, currentDate);
            console.log("User Message: ", userMessage);
            setResults(prevResults => [...prevResults, `User Message: ${userMessage}`]);
        
            // API 응답 시뮬레이션
            const mockResult = userMessage; 
            console.log("ChatGPT Response: ", mockResult);
            setResults(prevResults => [...prevResults, `ChatGPT Response: ${mockResult}`]);
        
        } catch (error) {
            console.error("Error fetching ChatGPT response: ", error.response ? error.response.data : error.message);
            setResults(prevResults => [...prevResults, `Error: ${error.message}`]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (step > questions.length) {
            const finalAnswers = answers.map(a => a.answer);
            fetchChatGPTResponse(finalAnswers);
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [answers, step]);

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
                    {isLoading && (
                        <div className={styles.bubbleContainer}>
                            <div className={`${styles.loading}`}>로딩 중...</div>
                        </div>
                    )}
                    <div>
                        {results.map((result, index) => (
                            <div key={index}>{result}</div>
                        ))}
                    </div>
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
    );
}
