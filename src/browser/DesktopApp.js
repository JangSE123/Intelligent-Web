import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './BrowserHeader'
import DesktopMain from './DesktopMain'
import PlannerChat from './PlannerChat'; // Example component, adjust import
import Calendar from './Calendar';
import Develop from './Develop';
import GitConnection from './GitConnection';
import HelpDocs from './HelpDocs';
import GrassCustom from './GrassCustom';


export default function DesktopApp() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<DesktopMain />} />
          <Route path="/planner-chat" element={<PlannerChat/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/develop" element={<Develop/>} />
          <Route path="/git-connection" element={<GitConnection/>} />
          <Route path="/help-docs" element={<HelpDocs/>} />
          <Route path="/grass-custom" element={<GrassCustom/>} />
        </Routes>
    </Router>
  )
}
