import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {Header} from './components/Header/Header';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  return (
    <Router>
      <GlobalStyles />
      {/*
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>*/}
      <div className="container-fluid page-content red-border ">
        <Home/>
      </div>
    </Router>
  );
};

export default App;

