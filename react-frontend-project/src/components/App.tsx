import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/login';

const App: React.FC = () => {
  return (
    <>
      {/* <Router>
        <Route path='/' component={Login} />
      </Router> */}
      <Login />\ hihi
    </>
  );
};

export default App;
