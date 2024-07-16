import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MobileHeader from './MobileHeader';
import MobileLogin from './MobileLogin';
import MobileGitHub from './MobileGitHub';
import MakePlan from './MakePlan';
import MobileMyPage from './MobileMyPage';
import HelpPage from './HelpPage';
import MobileTaskList from './MobileTaskList';
import styles from './MobileApp.module.css';

function MobileApp(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = props.user;
    const setUser = props.setUser;

    const userData = props.userData;
    const setUserData = props.setUserData;

    const accessToken = props.accessToken;
    const setAccessToken = props.setAccessToken;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div>
                <MobileHeader userData={userData} setUserData={setUserData} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className={isMenuOpen ? styles.blurred : ''}>
                    <Routes>
                        <Route path="/" element={<MobileLogin userData={userData} setUserData={setUserData} user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} />} />
                        <Route path="/github" element={<MobileGitHub userData={userData} setUserData={setUserData} />} />
                        <Route path="/planner" element={<MakePlan userData={userData} setUserData={setUserData}/>} />
                        <Route path="/help" element={<HelpPage />} />
                        <Route path="/MobileTaskList" element={<MobileTaskList userData={userData} setUserData={setUserData}/>} />
                        <Route path="/mypage" element={<MobileMyPage userData={userData} setUserData={setUserData} />} /> 
                    </Routes>
                </div>
                {isMenuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
            </div>
        </Router>
    );
}


export default MobileApp;
