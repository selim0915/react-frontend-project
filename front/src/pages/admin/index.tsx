import React, { useEffect, useState } from 'react';
import api from '../../apis/api';
import Shell from '../../components/Shell';
import { Searchbutton, SearchForm, SearchInput, SearchLabel, ShellForm, ShellInput } from './admin.style';
import AdminHelp from './adminHelp';

const MAX_LENGTH = 10000;

const logs = `
[2025-05-09 11:36:10 KST] INFO: Received request: GET /api/users from 192.168.1.101
[2025-05-09 11:36:10 KST] DEBUG: Request headers: { "User-Agent": "Mozilla/5.0...", "Accept": "application/json" }
[2025-05-09 11:36:10 KST] DEBUG: Processing request for /api/users
[2025-05-09 11:36:15 KST] INFO: Sent response: 200 OK for /api/users in 500ms
[2025-05-09 11:36:15 KST] DEBUG: Response headers: { "Content-Type": "application/json" }
[2025-05-09 11:36:15 KST] DEBUG: Response body: [{"id": 1, "name": "John Doe"}, {"id": 2, "name": "Jane Smith"}]
[2025-05-09 11:37:00 KST] INFO: Received request: POST /api/orders from 192.168.1.102
[2025-05-09 11:37:00 KST] DEBUG: Request body: { "userId": 1, "items": ["productA", "productB"] }
[2025-05-09 11:37:05 KST] ERROR: Failed to process order for user 1: Insufficient stock.
[2025-05-09 11:37:05 KST] INFO: Sent response: 400 Bad Request for /api/orders in 50ms
[2025-05-09 11:37:05 KST] DEBUG: Response body: { "error": "Insufficient stock" }
[2025-05-09 11:41:20 KST] DEBUG: Executing SQL query: SELECT * FROM users WHERE id = 5
[2025-05-09 11:41:20 KST] DEBUG: Query executed in 12ms, 1 row(s) returned.
[2025-05-09 11:42:05 KST] DEBUG: Executing SQL query: INSERT INTO orders (user_id, order_date) VALUES (1, '2025-05-09')
[2025-05-09 11:42:05 KST] DEBUG: Query executed in 8ms, 1 row(s) affected.
[2025-05-09 11:56:10 KST] ERROR: Unhandled exception in module 'payment': TypeError: Cannot read property 'amount' of undefined
[2025-05-09 11:56:10 KST] ERROR: Stack trace:
    at processPayment (/app/modules/payment.js:25:12)
    at handleOrder (/app/controllers/order.js:40:5)
    ...
[2025-05-09 11:57:00 KST] WARNING: Configuration file not found at /etc/app/config.json. Using default configuration.
[2025-05-09 11:58:30 KST] CRITICAL: Security vulnerability detected: Potential SQL injection in user search.
[2025-05-09 11:44:00 KST] ERROR: Database error: Connection timeout. Retrying... (Attempt 1/3)
[2025-05-09 11:44:03 KST] INFO: Database connection re-established.
`;

const Admin: React.FC = () => {
  const initialState = {
    keyword: 'ERROR:',
    filter: false,
    highlight: true,
  };
  const [searchData, setSearchData] = useState(initialState);
  const [draftsearchData, setDraftSearchData] = useState(initialState);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  useEffect(() => () => socket?.close(), [socket]);

  const handleAppendOutput = (line: string) => {
    setOutput((prev) => {
      const newOutput = [...prev, line];
      let totalLength = newOutput.reduce((sum, str) => sum + str.length, 0);

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

    if (id === 'autoScroll') {
      setAutoScroll(checked);
      return;
    }

    setDraftSearchData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogRequest = async () => {
    if (socket) {
      await api.get('/api/test');
    } else {
      logs.split('\n').map((v) => handleAppendOutput(v));
    }
  };

  return (
    <>
      <>
        <SearchLabel htmlFor="socket">웹소켓 {socket ? 'On' : 'Off'}</SearchLabel>
        <SearchInput type="checkbox" id="socket" checked={!!socket} onChange={handleToggleChange} />

        <SearchLabel htmlFor="autoScroll">자동스크롤</SearchLabel>
        <SearchInput type="checkbox" id="autoScroll" checked={autoScroll} onChange={handleChange} />
      </>
      <Searchbutton type="button" onClick={handleLogRequest}>
        Add logs{' '}
      </Searchbutton>

      <SearchForm onSubmit={handleSearch}>
        <SearchLabel htmlFor="keyword">키워드</SearchLabel>
        <SearchInput type="text" id="keyword" value={draftsearchData.keyword} onChange={handleChange} />

        <SearchLabel htmlFor="highlight">강조</SearchLabel>
        <SearchInput type="checkbox" id="highlight" checked={draftsearchData.highlight} onChange={handleChange} />

        <SearchLabel htmlFor="filter">필터링</SearchLabel>
        <SearchInput type="checkbox" id="filter" checked={draftsearchData.filter} onChange={handleChange} />

        <Searchbutton type="submit">검색</Searchbutton>
      </SearchForm>
      <Shell output={output} searchData={searchData} maxLines={200} autoScroll={autoScroll} />

      <ShellForm onSubmit={handleSubmit}>
        $<ShellInput type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="node cli..." />
      </ShellForm>
      <AdminHelp />
    </>
  );
};

export default Admin;
