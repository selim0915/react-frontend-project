import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => {
  console.log(process.env.NODE_ENV);
  // eslint-disable-next-line no-undef
  console.log(TWO);
  // eslint-disable-next-line no-undef
  console.log(api.domain)

  const alert = msg => window.alert(msg);

  return(
    <div>
      <h1>Hello World??</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));