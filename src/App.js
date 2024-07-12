import { BrowserView, MobileView } from 'react-device-detect'
import MobileApp from './mobile/MobileApp';
import DesktopApp from './browser/DesktopApp';
import MobileLogin from './mobile/MobileLogin';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <>
      <BrowserView>
        <DesktopApp userData={userData} setUserData={setUserData}/>
      </BrowserView>
      <MobileView>
        <MobileApp userData={userData} setUserData={setUserData} user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken}/>
        {/* <MobileLogin/> */}
      </MobileView>
    </>
  );
};

export default App;
