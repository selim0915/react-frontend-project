import React, { useEffect, useRef, useState } from 'react';
import api from '../../apis/api';
import {
  Searchbutton,
  SearchForm,
  SearchInput,
  SearchLabel,
  ShellDiv,
  ShellForm,
  ShellInput,
  ShellLine,
  ShellWord,
} from './admin.style';
import AdminHelp from './adminHelp';

const MAX_LENGTH = 10000;

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
  const [draftsearchData, setDraftSearchData] = useState(initialState);

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

  const renderShell = (): React.ReactNode[] => {
    const { keyword, filter, highlight } = searchData;
    const searchWord = keyword.trim().toLowerCase();

    return output.map((line, idx) => {
      const isMatched = line.toLowerCase().includes(searchWord);

      if (
        // keyword 값이 없는 경우
        !searchWord ||
        // filter, highlight 모두 비활성화된 경우
        (!filter && !highlight) ||
        // highlight만 활성화되어 있고, keyword와 매칭되는 텍스트가 없는 경우
        (!filter && highlight && !isMatched)
      ) {
        // 원본 텍스트 출력
        return <ShellLine key={idx}>{line}</ShellLine>;
      }

      const regex = new RegExp(`(${searchWord})`, 'gi');
      const parts = line.split(regex);

      return (
        <ShellLine key={idx} className={!isMatched && filter ? 'hidden' : ''}>
          {parts.map((v, i) =>
            v.toLowerCase() === searchWord ? (
              <ShellWord key={i} className={isMatched && highlight ? 'highlight' : ''}>
                {v}
              </ShellWord>
            ) : (
              v
            ),
          )}
        </ShellLine>
      );
    });
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

      <ShellDiv ref={outputRef}>{renderShell()}</ShellDiv>

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
