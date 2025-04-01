import React, { useEffect, useState } from 'react';

const Admin: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isWs, setisWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    setisWs(ws);

    ws.onmessage = (event) => {
      setOutput(event.data);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isWs) {
      isWs.send(input);
      setInput('');
    }
  };

  const handleClose = () => {
    if (isWs) {
      isWs.close();
      setisWs(null);
    }
  };

  return (
    <div>
      <div style={{ width: '50%', height: 200, border: `1px solid #000` }}>{output}</div>
      <form style={{ display: 'flex', gap: 10, padding: '20px 0px' }} onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="node cli..." />
        <button type="submit">실행</button>
        <button type="button" onClick={handleClose}>
          웹소켓 끊기
        </button>
      </form>
    </div>
  );
};

export default Admin;
