import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Log from './components/Log';
import Sign from './components/Sign';
import { BrowserRouter, Routes, Route,Navigate, HashRouter } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Main from './components/Main';
import Yearstat from './components/Yearstat';
import Monthstat from './components/Monthstat';
import History from './components/History';
import Profile from './components/Profile';
import Passwordchange from './components/Passwordchange';
import Otpgen from './components/Otpgen';
import Otpverify from './components/Otpvrify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>

      <Routes>
        <Route element={<App/>}>
      <Route path="/" element={<Home />}/>
       <Route path="main" element={<Main />}/>
        <Route path="login" element={<Log />}/>
        <Route path="sign" element={<Sign />} />
        <Route path="about" element={<About />} />
        <Route path="year" element={<Yearstat />} />
        <Route path="month" element={<Monthstat />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
        <Route path="passchange" element={<Passwordchange />} />
        <Route path="otpgen" element={<Otpgen />} />
        <Route path="otpver" element={<Otpverify />} />
        </Route>
      </Routes>

    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
