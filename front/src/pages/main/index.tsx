import React from 'react';
import { netflix } from '../../utils/image.import';

const Main: React.FC = () => {
  return (
    <>
      <h1>Main</h1>
      <img src={netflix} alt="img" width={100} height={50} />
    </>
  );
};

export default Main;
