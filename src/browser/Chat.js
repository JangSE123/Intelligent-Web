import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Headers from './BrowserHeader';
import styles from './Chat.module.css';

export default function Chat() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    
    const chatEndRef = useRef(null);

    const questions = [
        "공부할 언어를 선택해주세요",
        "공부할 기간을 선택해주세요",
        "하루에 공부할 시간을 선택해주세요"
    ];

    const options = {
        1: ["Python", "Java", "C"],
        2: ["7일", "15일", "30일"],
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
        try {
            const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 가져오기
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `내가 ${finalAnswers[1]} 동안  ${finalAnswers[0]}을(를) 매일 ${finalAnswers[2]} 씩 초급 난이도로 공부할거야  한글로 타이틀과 세부계획을 만들어주고 
                    date는 ${currentDate}기준 "title": "","start_date": "",days: ["day": , "date": "", "topics": "", "activities":""] JSON형태로 알려줘. 절대 내용 생략하지 말고 activities 자세히 작성해 JSON말고 다른 내용은 반환하지마` }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer your-api-key`,
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data.choices[0].message.content;
            console.log("ChatGPT Response: ", result);
            // 여기서 결과를 필요한 형태로 변환하거나 추가 처리합니다.
        } catch (error) {
            console.error("Error fetching ChatGPT response: ", error);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (step > questions.length) {
            const finalAnswers = answers.map(a => a.answer);
            fetchChatGPTResponse(finalAnswers);
        }
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
    );
}
