import React, { useState } from 'react';
import { LoginButton, LoginInput, LoginWrap } from '../../style/login.style';

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
      localStorage.setItem('id', id);
      window.location.href = '/';
    } else {
      alert('아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <>
      <LoginWrap>
        <h1>SAMPEOPLE</h1>
        <LoginInput
          type='text'
          id='id'
          value={id}
          onChange={_onChange}
          onKeyDown={_onKeyDownEnter}
          placeholder={'아이디를 입력하세요'}
        />
        <LoginInput
          type='password'
          id='password'
          value={password}
          onChange={_onChange}
          onKeyDown={_onKeyDownEnter}
          placeholder={'비밀번호를 입력하세요'}
        />
        <LoginButton type='button' onClick={login}>
          로그인
        </LoginButton>
      </LoginWrap>
    </>
  );
};

export default Login;
