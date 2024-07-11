import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './BrowserHeader'
import DesktopMain from './DesktopMain'
import PlannerChat from './Chat'; // Example component, adjust import
import Calendar from './Calendar';
import Planner_Calendar from './Planner_Calendar';
import Develop from './Develop';
import GitConnection from './GitConnection';
import HelpDocs from './HelpDocs';
import GrassCustom from './GrassCustom';
import TaskList from './TaskList';


export default function DesktopApp(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<DesktopMain userData={userData} setUserData={setUserData}/>} />
          <Route path="/planner-chat" element={<PlannerChat userData={userData} setUserData={setUserData}/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/tasklist" element={<TaskList/>} />
          <Route path="/planner_calendar" element={<Planner_Calendar/>} />
          <Route path="/develop" element={<Develop/>} />
          <Route path="/git-connection" element={<GitConnection userData={userData} setUserData={setUserData}/>} />
          <Route path="/help-docs" element={<HelpDocs/>} />
          <Route path="/grass-custom" element={<GrassCustom/>} />
        </Routes>
    </Router>
  )
}
