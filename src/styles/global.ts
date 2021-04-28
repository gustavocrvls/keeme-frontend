import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar {
    width: 8px;
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c9c9c9;
  }
`;
