import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Board from './board/Board';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/board/*' element={<Board />} />
        <Route path='*' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
