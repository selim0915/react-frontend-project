import styled from 'styled-components';

const LoginWrap = styled.div`
  width: 200px;
  height: 500px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 10px;
`;

const LoginInput = styled.input`
  width: 200px;
  height: 20px;
  padding: 10px 10px;
  border-radius: 3px;
  border: 1px solid lightgray;
`;

const LoginButton = styled.button`
  width: 222px;
  height: 40px;
  margin-top: 20px;
  padding: 4px 10px;
  border: 0px;
  border-radius: 3px;
  background-color: #3aa4d2;
  color: #ffffff;
`;

export { LoginWrap, LoginInput, LoginButton };
