import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  gap: 3px;
  padding: 10px 0px;
`;
export const SearchLabel = styled.label``;
export const SearchInput = styled.input`
  border: 1px solid;
`;
export const Searchbutton = styled.button`
  background-color: gray;
  border-radius: 20px;
  padding: 0 10px;
`;

export const ShellDiv = styled.div`
  width: 50%;
  height: 500px;
  border: 1px solid #000;
  white-space: pre-wrap;
  overflow: auto;
  resize: both;
`;
interface ShellSearchProps {
  $keyword?: string;
  $filter?: boolean;
  $highlight?: boolean;
}
export const ShellLine = styled.div<ShellSearchProps>`
  display: block;

  ${(props) =>
    props.$filter &&
    props.className?.includes(props.$keyword || '') &&
    `
      display: none;
    `}
`;
export const ShellWord = styled.span<ShellSearchProps>`
  font-weight: normal;
  background-color: unset;

  ${(props) =>
    props.$highlight &&
    props.className === props.$keyword &&
    `
      font-weight: bold;
      background-color: yellow;
    `}
`;
export const ShellForm = styled.form`
  display: flex;
  gap: 3px;
`;
export const ShellInput = styled.input`
  width: 400px;
`;
