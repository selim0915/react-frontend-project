import styled from 'styled-components';
import { Theme } from '../utils/constants';

export const CommonForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 15px;
`;

export const CommonInput = styled.input`
  width: 220px;
  height: 40px;
  padding: 10px 10px;
  border-radius: 3px;
  border: 1px solid lightgray;
  box-sizing: border-box;
`;

export const CommonButton = styled.button`
  width: 220px;
  height: 40px;
  padding: 4px 10px;
  box-sizing: border-box;
  border: 0px;
  border-radius: 3px;
  background-color: ${Theme.mainColor};
  color: #ffffff;
`;
