import React, { useState } from 'react';
import { CommonButton, CommonForm, CommonInput } from '../../styles/common.style';

const Signup: React.FC = () => {
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
      <CommonForm onSubmit={login}>
        <h1>회원가입</h1>
        <CommonInput type="text" id="id" value={id} onChange={_onChange} placeholder={'아이디를 입력하세요'} />
        <CommonInput
          type="password"
          id="password"
          value={password}
          onChange={_onChange}
          placeholder={'비밀번호를 입력하세요'}
        />
        <CommonButton type="submit">로그인</CommonButton>
      </CommonForm>
    </>
  );
};

export default Signup;
