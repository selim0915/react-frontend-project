import React, { useEffect, useState } from 'react';
import api from '../../apis/api';
import Shell from '../../components/Shell';
import { Searchbutton, SearchForm, SearchInput, SearchLabel, ShellForm, ShellInput } from './admin.style';
import AdminHelp from './adminHelp';

const MAX_LENGTH = 10000;

const handleLogRequest = async () => {
  await api.get('/api/test');
};

const Admin: React.FC = () => {
  const initialState = {
    keyword: '',
    filter: false,
    highlight: false,
  };
  const [searchData, setSearchData] = useState(initialState);
  const [draftsearchData, setDraftSearchData] = useState(initialState);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    return () => socket?.close();
  }, [socket]);

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
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    handleAppendOutput(event.data);
  };

  const handleCloseWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  const handleConnectWebSocket = () => {
    if (!socket) {
      const ws = new WebSocket('ws://localhost:3001');
      ws.onopen = () => handleAppendOutput('Connection WebSocket\n');
      ws.onmessage = handleWebSocketMessage;
      ws.onclose = () => {
        handleCloseWebSocket();
        handleAppendOutput('Close WebSocket\n');
      };
      ws.onerror = (error) => {
        handleAppendOutput(`Error WebSocket: ${error}\n`);
      };
      setSocket(ws);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData(draftsearchData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket) {
      handleAppendOutput('Not Connection WebSocket\n');
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

    setDraftSearchData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch}>
        <SearchLabel>
          키워드
          <SearchInput type="text" id="keyword" value={draftsearchData.keyword} onChange={handleChange} />
        </SearchLabel>
        <SearchLabel>
          강조
          <SearchInput type="checkbox" id="highlight" checked={draftsearchData.highlight} onChange={handleChange} />
        </SearchLabel>
        <SearchLabel>
          필터링
          <SearchInput type="checkbox" id="filter" checked={draftsearchData.filter} onChange={handleChange} />
        </SearchLabel>
        <Searchbutton type="submit">검색</Searchbutton>
        <Searchbutton type="button" onClick={handleLogRequest}>
          Add logs{' '}
        </Searchbutton>
      </SearchForm>

      <Shell output={output} searchData={searchData} maxLines={20} />

      <ShellForm onSubmit={handleSubmit}>
        $<ShellInput type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="node cli..." />
        웹소켓 {socket ? 'On' : 'Off'}
        <SearchInput type="checkbox" checked={!!socket} onChange={handleToggleChange} />
      </ShellForm>

      <AdminHelp />
    </>
  );
};

export default Admin;
