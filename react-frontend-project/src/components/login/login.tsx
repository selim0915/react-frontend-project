import React from 'react';
import { netflix } from '../../utils/image.import';

function Login() {
  return (
    <div>
      <h1>Hello World</h1>
      <img src={netflix} alt='img' width={100} height={50} />
    </div>
  );
}

export default Login;
