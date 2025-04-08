import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  gap: 3px;
  padding: 10px 0px;
`;
export const SearchLabel = styled.label``;
export const SearchInput = styled.input``;
export const Searchbutton = styled.button`
  width: 90px;
`;

export const ShellDiv = styled.div`
  width: 50%;
  height: 500px;
  // color: '#fff',
  // backgroundColor: '#000',
  border: 1px solid #000;
  white-space: pre-wrap;
  overflow: auto;
  resize: both;
`;
export const ShellLine = styled.div`
  display: block;
  &.hidden {
    display: none;
  }
`;
export const ShellWord = styled.span`
  font-weight: normal;
  background-color: unset;
  &.highlight {
    font-weight: bold;
    background-color: yellow;
  }
`;
export const ShellForm = styled.form`
  display: flex;
  gap: 3px;
`;
export const ShellInput = styled.input`
  width: 400px;
`;
