import React, { useEffect, useState } from 'react';

const Admin: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    return () => socket?.close();
  }, [socket]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && input) {
      socket.send(input);
      setInput('');
    }
  };

  const handleConnectWebSocket = () => {
    if (!socket) {
      const ws = new WebSocket('ws://localhost:3001');
      ws.onopen = () => console.log('WebSocket Connected');
      ws.onmessage = (event) => setOutput(event.data);
      ws.onclose = () => console.log('WebSocket Disconnected');
      ws.onerror = (error) => console.error('WebSocket Error:', error);

      setSocket(ws);
    }
  };

  const handleCloseWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  return (
    <div>
      <h3>웹소켓 연결 : {socket ? '연결됨' : '끊김'}</h3>

      <div style={{ width: '50%', height: 200, border: `1px solid #000`, whiteSpace: 'pre-wrap', overflow: 'auto' }}>
        {output}
      </div>
      <form style={{ display: 'flex', gap: 10, padding: '20px 0px' }} onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="node cli..." />

        <button type="submit" disabled={!socket}>
          Send
        </button>
        <button type="button" onClick={handleConnectWebSocket}>
          웹소켓 연결
        </button>
        <button type="button" onClick={handleCloseWebSocket}>
          웹소켓 끊기
        </button>
      </form>

      <code>
        <div>cd</div>
        <div>dir</div>
        <div>type gitignore</div>
      </code>
    </div>
  );
};

export default Admin;
