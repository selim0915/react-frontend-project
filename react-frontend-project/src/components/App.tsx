import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Board from './board/Board';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;
