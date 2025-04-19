import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homepage/homePage.jsx';
import ModulePage from '../pages/modulepage/modulePage.jsx';
import HistoryPage from "../pages/historypage/historyPage.jsx"; 
import ClientLogin from '../pages/customerProfile/loginPage.jsx';
import Register from '../pages/customerProfile/registerPage.jsx';
import SubmodulePage from '../pages/submodulepage/submodulePage.jsx';
import QuizPage from '../pages/quizpage/quizPage.jsx';


const Main_Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/module/:moduleName" element={<ModulePage />} />
      <Route path="/module/:moduleName/submodule/:submoduleIndex" element={<SubmodulePage />} />
       <Route path="/module/:moduleName/quiz" element={< QuizPage/>} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/login" element={<ClientLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Main_Router;
