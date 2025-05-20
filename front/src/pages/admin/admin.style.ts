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

// Shell Component style
export const ShellWrap = styled.div`
  position: relative;
  width: 700px;
  height: 200px;
  border: 1px solid #000;
  word-break: break-word;
  white-space: normal;
  overflow: auto;
  resize: both;
`;
export const VirtualizerList = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
`;
export const ShellRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  &.log-show {
    visibility: visible;
  }
  &.log-hidden {
    visibility: hidden;
  }

  &.log-highlight {
    font-weight: normal;
    background-color: unset;

    .matched {
      font-weight: bold;
      background-color: yellow;
      color: black;
    }
  }
`;
export const ShellWord = styled.span``;
