import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Headers from './BrowserHeader';
import styles from './Chat.module.css';

export default function Chat(props) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [gptResponse, setGptResponse] = useState(null);
    const [parsedResponse, setParsedResponse] = useState(null);
    const [apiKey, setApiKey] = useState(null); // API 키 상태 추가

    const userData = props.userData;
    const setUserData = props.setUserData;

    const chatEndRef = useRef(null);
    console.log("Chat.js userData: ", userData);
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

    useEffect(() => {
        // 서버에서 API 키를 가져옵니다
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/config');
                setApiKey(response.data.gptApiKey);
            } catch (error) {
                console.error("Error fetching API key: ", error);
            }
        };

        fetchApiKey();
    }, []);

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
        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo-16k",
                messages: [
                    { role: "system",
                        content: `너는 코딩 학습 플래너 제작소야. 사용자가 기간,언어,공부 시간을 제시하면 너는 그거에 맞게 난이도를 초급 수준으로 학습 계획을 짜줘야해.`+
                        `너는 한글로 학습 타이틀과 세부 계획을 만들어야하고 날짜는 ${currentDate}가 기준이야. DB에 저장할거라서 꼭 JSON형태로 알려줘`+
                        '다음은 너가 만들 때 꼭 지켜야 할 JSON 구조야. () 안을 너가 만들었던 내용을 넣어.'+
                        `"title": (), "start_date": (), "days":[ "day": (), "date": (), "topics": (), "activities": ["idx": (), "act": ()]] `+
                        ` 마지막으로 꼭 지켜야 할 사항을 다시 짚어 줄게 `+ 
                        ` 1. 제시된 JSON 형태를 무조건 따르고 줄바꿈은 하지 말 것., 2. 날짜를 현재 날짜 기준으로 시작할 것 3. act에는 꼭 하나의 주제만 들어갈 것( 공부 주제가 여러 개라면, act를 하나 더 추가해서 보여주기) 4.답변 생략하지 말고 무조건 끝까지 다 말해 5. JSON외의 답변은 절대 하지 말 것`
                    },
                    {
                        role: "user", content: `기간: ${finalAnswers[1]} , 언어: ${finalAnswers[0]}, 시간: ${finalAnswers[2]} `
                    }
                ]
            }, {
                headers: {
                    'Authorization': `${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const result = response.data.choices[0].message.content;
            console.log("ChatGPT Response: ", result);
            setGptResponse(result);
            
            try {
                const parsedData = JSON.parse(result);
                // Ensure parsedData has expected structure
                if (!parsedData.title || !parsedData.start_date || !parsedData.days) {
                    throw new Error('Parsed data does not contain expected fields');
                }
                setParsedResponse(parsedData);
                
                // Save plan data
                await axios.post('http://localhost:5001/api/savePlan', {
                    login: userData.login, // Assuming userData.login is accessible here
                    title: parsedData.title,
                    start_date: parsedData.start_date,
                    days: parsedData.days
                }, {
                    withCredentials: true // 쿠키를 전송할 수 있도록 설정
                })
                .then(response => {
                    console.log('Plan saved successfully:', response.data);
                    savePlanData(userData.login, parsedData); // savePlanData 함수 호출
                });
            } catch (error) {
                console.error('Error parsing or handling parsed data:', error);
            }
        } catch (error) {
            console.error("Error fetching ChatGPT response: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    


    const savePlanData = async (login, parsedData) => {
        const { title, start_date, days } = parsedData;
    
        try {
            const response = await axios.post('http://localhost:5001/api/savePlan', {
                login: login,
                title: title,
                start_date: start_date,
                days: days
            });
    
            console.log('Plan saved successfully:', response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error saving plan - server responded:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error saving plan - no response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error saving plan - request setup:', error.message);
            }
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
                    {isLoading && (
                        <div className={styles.bubbleContainer}>
                            <div className={`${styles.loading}`}>로딩 중...</div>
                        </div>
                    )}
                    {gptResponse && parsedResponse && (
                        <div className={styles.bubbleContainer}>
                            <div className={styles.questionBubble}>ChatGPT 답변</div>
                            <div className={`${styles.questionBubble} ${styles.gptResponse}`}>
                                <h2>{parsedResponse.title}</h2>
                                <p>시작 날짜: {parsedResponse.start_date}</p>
                                <h3>계획</h3>
                                <ul>
                                    {parsedResponse.days.map((day, index) => (
                                        <li key={index}>
                                            <strong>Day {day.day}: {day.date}</strong><br />
                                            <strong>Topics:</strong> {day.topics}<br />
                                            <strong>Activities:</strong> {day.activities}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
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
