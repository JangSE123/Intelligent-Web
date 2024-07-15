import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './MakePlan.module.css';

export default function MakePlan(props) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [gptResponse, setGptResponse] = useState(null);
    const [parsedResponse, setParsedResponse] = useState(null);
    const [apiKey, setApiKey] = useState(null);

    const userData = props.userData;
    const setUserData = props.setUserData;

    const chatEndRef = useRef(null);
    console.log("MakePlan.js userData: ", userData);
    const questions = [
        "공부할 기간을 선택해주세요",
        "공부할 언어를 선택해주세요",
        "당신의 실력은 어느 정도인가요?"
    ];

    const options = {
        1: ["5일", "7일", "10일", "14일", "18일", "21일"],
        2: ["Python", "Java", "C", "JavaScript", "HTML", "CSS"],
        3: ["초급자", "중급자", "전문가"]
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
                    { role: "system", content: `넌 코딩언어 학습 일정 플랜을 한글로 짜주는 AI야. 기간, 언어, 시작날짜를 입력받아서  "title": "(제목)","start_date": "(시작일자)",days: ["day": (몇일차int로), "date": "(날짜)", "topics": "(그날주제)",  "activities":"("내용1","내용2","내용3")"]의 Json 형식으로 값을 반환해 ()의 내용은 너가 체워넣어야해 답변 생략하지마` },
                    {
                        role: "user", content: `기간: ${finalAnswers[0]} 언어: ${finalAnswers[1]} 난이도: ${finalAnswers[2]} 시작날짜 ${currentDate} JSON말고 다른 내용은 반환하지마`
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
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
            <div className={styles.chatContainer}>
                <div className={styles.bubblesContainer}>
                    <div className={styles.bubbleContainer}>
                        <div className={styles.questionBubble}>
                            안녕하세요 프로그래밍 공부 Plan을 짜주는  <span className={styles.planCrafter}>"PlanCrafter"</span> 입니다.<br/>
                            여러분의 목표에 맞춰 맞춤형 학습 계획을 세워드립니다. 함께 성공적인 학습 여정을 시작해 보세요!
                        </div>
                    </div>
                    {answers.map((qa, index) => (
                        <div key={index} className={styles.bubbleContainer}>
                            <div className={styles.questionBubble}>{qa.question}</div>
                            <div className={`${styles.answerBubble} ${styles.rightAlign}`}>{qa.answer}</div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className={styles.bubbleContainer}>
                            <div className={styles.loading}>
                                <div className={styles.loader}></div>
                            </div>
                        </div>
                    )}
                    {gptResponse && parsedResponse && (
                        <div className={styles.bubbleContainer}>
                            <div className={`${styles.questionBubble} ${styles.gptResponse}`}>
                                <h1>{parsedResponse.title}</h1>
                                <p>시작 날짜: {parsedResponse.start_date}</p>
                                <h3>계획</h3>
                                <ul>
                                    {parsedResponse.days.map((day, index) => (
                                        <li key={index}>
                                            <strong>Day {day.day}: {day.date}</strong><br />
                                            <strong>Topics:</strong> {day.topics}<br />
                                            <strong>Activities:</strong> {day.activities.join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.questionBubble}>답변 생성이 완료 되었습니다.<br/>Calendar에서 지금 바로 확인하세요.</div>
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
