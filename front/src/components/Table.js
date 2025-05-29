import styled from "styled-components";

const BaseColor = "#ddd";
const HeaderColor = "#f0f0f0";

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    background: white;
    border: 1px solid ${BaseColor};
  }

  & .center {
    text-align: center;
  }

  & thead th {
    padding: 6px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    background: ${HeaderColor};
  }

  & tbody td {
    font-weight: 200;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  & .underline {
    border-bottom: 1px solid ${BaseColor};
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const TH = styled.th`
  width: ${size => (size ? `${size}px` : "100%")};
`;
