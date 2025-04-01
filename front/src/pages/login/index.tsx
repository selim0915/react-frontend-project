import React, { useState } from 'react';
import { CommonButton, CommonForm, CommonInput } from '../../styles/common.style';

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

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <CommonForm>
        <h1>SAMPEOPLE</h1>
        <CommonInput
          type="text"
          id="id"
          value={id}
          onChange={_onChange}
          onKeyDown={_onKeyDownEnter}
          placeholder={'아이디를 입력하세요'}
        />
        <CommonInput
          type="password"
          id="password"
          value={password}
          onChange={_onChange}
          onKeyDown={_onKeyDownEnter}
          placeholder={'비밀번호를 입력하세요'}
        />
        <CommonButton type="submit" onClick={login}>
          로그인
        </CommonButton>
      </CommonForm>
    </>
  );
};

export default Login;
