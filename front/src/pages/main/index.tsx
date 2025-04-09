import React, { useEffect, useState } from 'react';
import { netflix } from '../../utils/image.import';

const Main: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [_time2, setTime2] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function func() {
    const _a = '1234';
  }

  return (
    <>
      <h1>Main</h1>
      <span>{time.toLocaleString()}</span>
      <img src={netflix} alt="img" width={100} height={50} />
    </>
  );
};

export default Main;
