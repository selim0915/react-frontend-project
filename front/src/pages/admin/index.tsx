import React, { useEffect, useRef, useState } from 'react';
import api from '../../apis/api';
import {
  H3,
  Mark,
  Searchbutton,
  SearchForm,
  SearchInput,
  SearchLabel,
  Shell,
  ShellForm,
  ShellInput,
  ShellLine,
} from './admin.style';
import AdminHelp from './adminHelp';

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
    const { keyword, filter, highlight } = searchRef.current;
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
        part.toLowerCase() === word.toLowerCase() ? <Mark key={idx}>{part}</Mark> : part,
      );
      setStyledOutput((prev) => [...prev, <>{line}</>]);
      return;
    }

    setStyledOutput((prev) => [...prev, data]);
  };

  const handleApplyStyledOutput = (data: string[]) => {
    const { keyword, filter, highlight } = searchRef.current;
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
          part.toLowerCase() === word.toLowerCase() ? <Mark key={idx}>{part}</Mark> : part,
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
    <>
      <H3>
        웹소켓 <b>{socket ? 'On' : 'Off'}</b>
        <SearchInput type="checkbox" checked={!!socket} onChange={handleToggleChange} />
      </H3>

      <SearchForm onSubmit={handleSearch}>
        <SearchLabel>
          키워드
          <SearchInput type="text" id="keyword" value={searchData.keyword} onChange={handleChange} />
        </SearchLabel>
        <SearchLabel>
          강조
          <SearchInput type="checkbox" id="highlight" checked={searchData.highlight} onChange={handleChange} />
        </SearchLabel>
        <SearchLabel>
          필터링
          <SearchInput type="checkbox" id="filter" checked={searchData.filter} onChange={handleChange} />
        </SearchLabel>
        <Searchbutton type="submit">검색</Searchbutton>
        <Searchbutton type="button" onClick={handleLogRequest}>
          Add logs{' '}
        </Searchbutton>
      </SearchForm>

      <Shell ref={outputRef}>
        {styledOutput.map((line, index) => (
          <ShellLine key={index}>{line}</ShellLine>
        ))}
      </Shell>

      <ShellForm onSubmit={handleSubmit}>
        $<ShellInput type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="node cli..." />
      </ShellForm>

      <AdminHelp />
    </>
  );
};

export default Admin;
