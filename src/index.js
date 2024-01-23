import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  console.log(process.env.NODE_ENV);
  // eslint-disable-next-line no-undef
  console.log(TWO);
  // eslint-disable-next-line no-undef
  console.log(api.domain)

  return(
    <div>
      <h1>Hello World??</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));