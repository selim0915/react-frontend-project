import React, { useState } from 'react';

const Login: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'id') {
      setId(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const _onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  const login = () => {
    if (id && password) {
      localStorage.setItem('token', 'abcdefg');
      window.location.href = '/';
    } else {
      alert('아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <div>
      <input
        type='text'
        id='id'
        value={id}
        onChange={_onChange}
        onKeyDown={_onKeyDownEnter}
        placeholder={'아이디를 입력하세요'}
      />
      <input
        type='password'
        id='password'
        value={password}
        onChange={_onChange}
        onKeyDown={_onKeyDownEnter}
        placeholder={'비밀번호를 입력하세요'}
      />
      <button type='button' onClick={login}>
        로그인
      </button>
    </div>
  );
};

export default Login;
