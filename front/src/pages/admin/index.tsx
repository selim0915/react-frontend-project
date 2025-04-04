import React, { useEffect, useRef, useState } from 'react';
import api from '../../apis/api';

const MAX_LENGTH = 100000;

const Admin: React.FC = () => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    return () => socket?.close();
  }, [socket]);

  const handleLogRequest = async () => {
    await api.get('/api/test');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket) {
      handleCloseWebSocket();
      return;
    }

    if (!input) {
      setOutput((prev) => [...prev, '$\n']);
      return;
    }

    socket.send(input);
    setInput('');
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    setOutput((prev) => {
      const newOutput = [...prev, event.data];

      let totalLength = newOutput.reduce((sum, line) => sum + line.length, 0);

      while (totalLength > MAX_LENGTH && newOutput.length > 0) {
        totalLength -= newOutput[0].length;
        newOutput.shift();
      }

      return newOutput;
    });
  };

  const handleCloseWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setOutput((prev) => [...prev, 'Close WebSocket']);
  };

  const handleConnectWebSocket = () => {
    if (!socket) {
      const ws = new WebSocket('ws://localhost:3001');
      ws.onopen = () => {
        setOutput((prev) => [...prev, 'Connection WebSocket']);
      };
      ws.onmessage = handleWebSocketMessage;
      ws.onclose = handleCloseWebSocket;
      ws.onerror = (error) => console.error('WebSocket Error:', error);

      setSocket(ws);
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      handleConnectWebSocket();
    } else {
      handleCloseWebSocket();
    }
  };

  return (
    <div>
      <label>
        웹소켓 <b>{socket ? 'On' : 'Off'}</b>
        <input type="checkbox" checked={!!socket} onChange={handleToggleChange} />
      </label>

      <div
        ref={outputRef}
        style={{
          width: '50%',
          height: 500,
          // color: '#fff',
          // backgroundColor: '#000',
          border: `1px solid #000`,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          resize: 'both',
        }}
      >
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}

        <form style={{ display: 'flex', gap: 3 }} onSubmit={handleSubmit}>
          $
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="node cli..."
            list="searchOptions"
            style={{ width: '100%', imeMode: 'disabled' }}
          />
          <datalist id="searchOptions">
            <option>cd</option>
            <option>dir</option>
          </datalist>
          <button type="submit" style={{ display: 'none' }} />
          <button type="button" onClick={handleLogRequest} style={{ width: 100 }}>
            Add logs
          </button>
        </form>
      </div>

      <table border={1} cellSpacing={0}>
        <thead>
          <tr>
            <th>Windows</th>
            <th>Git Bash</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cd</td>
            <td>pwd</td>
          </tr>
          <tr>
            <td colSpan={2}>cd logs</td>
          </tr>
          <tr>
            <td>dir</td>
            <td>dir, ls</td>
          </tr>
          <tr>
            <td>type 2025-04-03.log</td>
            <td>tail -f 2025-04-04.log</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
