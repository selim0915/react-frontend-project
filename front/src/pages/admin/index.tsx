import React, { useEffect, useRef, useState } from 'react';
import api from '../../apis/api';

const MAX_LENGTH = 100000;

const handleLogRequest = async () => {
  await api.get('/api/test');
};

const Admin: React.FC = () => {
  const outputRef = useRef<HTMLDivElement>(null);
  const initialState = {
    keyword: '',
    filter: false,
    highlight: false,
  };
  const [searchData, setSearchData] = useState(initialState);
  const searchRef = useRef(searchData);
  const { keyword, filter, highlight } = searchRef.current;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [styledOutput, setStyledOutput] = useState<React.ReactNode[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [styledOutput]);

  useEffect(() => {
    return () => socket?.close();
  }, [socket]);

  useEffect(() => {
    searchRef.current = searchData;
  }, [searchData]);

  const handleApplyStyledLine = (data: string) => {
    const word = keyword.trim();

    if (!word || (!filter && !highlight)) {
      setStyledOutput((prev) => [...prev, data]);
      return;
    }

    if (filter && !data.toLowerCase().includes(word.toLowerCase())) {
      return;
    }

    if (highlight) {
      const regex = new RegExp(`(${word})`, 'gi');
      const parts = data.split(regex);
      const line = parts.map((part, idx) =>
        part.toLowerCase() === word.toLowerCase() ? <mark key={idx}>{part}</mark> : part,
      );
      setStyledOutput((prev) => [...prev, line]);
      return;
    }

    setStyledOutput((prev) => [...prev, data]);
  };

  const handleApplyStyledOutput = (data: string[]) => {
    const word = keyword.trim();

    if (!word || (!filter && !highlight)) {
      setStyledOutput([...data]);
      return;
    }

    let result = [...data];
    if (filter) {
      result = result.filter((v) => {
        return v.toLowerCase().includes(word.toLowerCase());
      });
    }

    if (highlight) {
      const regex = new RegExp(`(${word})`, 'gi');
      const highlighted = result.map((v) => {
        const parts = v.split(regex);

        return parts.map((part, idx) =>
          part.toLowerCase() === word.toLowerCase() ? <mark key={idx}>{part}</mark> : part,
        );
      });

      setStyledOutput(highlighted);
      return;
    }
    setStyledOutput(result);
  };

  const handleAppendOutput = (line: string) => {
    setOutput((prev) => {
      const newOutput = [...prev, line];
      let totalLength = newOutput.reduce((sum, line) => sum + line.length, 0);

      while (totalLength > MAX_LENGTH && newOutput.length > 0) {
        totalLength -= newOutput[0].length;
        newOutput.shift();
      }

      return newOutput;
    });

    handleApplyStyledLine(line);
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    handleAppendOutput(event.data);
  };

  const handleCloseWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    handleAppendOutput('Close WebSocket\n');
  };

  const handleConnectWebSocket = () => {
    if (!socket) {
      const ws = new WebSocket('ws://localhost:3001');
      ws.onopen = () => handleAppendOutput('Connection WebSocket\n');
      ws.onmessage = handleWebSocketMessage;
      ws.onclose = handleCloseWebSocket;
      ws.onerror = (error) => {
        handleAppendOutput(`Error WebSocket: ${error}\n`);
      };
      setSocket(ws);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleApplyStyledOutput(output);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket) {
      handleCloseWebSocket();
      return;
    }

    if (!input) {
      handleAppendOutput('$\n');
      return;
    }

    socket.send(input);
    setInput('');
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      handleConnectWebSocket();
    } else {
      handleCloseWebSocket();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;

    setSearchData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <label>
        웹소켓 <b>{socket ? 'On' : 'Off'}</b>
        <input type="checkbox" checked={!!socket} onChange={handleToggleChange} />
      </label>
      <button type="button" onClick={handleLogRequest} style={{ width: 100 }}>
        Add logs
      </button>
      <form onSubmit={handleSearch} style={{ padding: '10px 0px' }}>
        <input type="text" id="keyword" value={keyword} onChange={handleChange} />
        <label>
          강조
          <input type="checkbox" id="highlight" checked={highlight} onChange={handleChange} />
        </label>
        <label>
          필터링
          <input type="checkbox" id="filter" checked={filter} onChange={handleChange} />
        </label>
        <button type="submit">검색</button>
      </form>

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
        {styledOutput.map((line, index) => (
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
