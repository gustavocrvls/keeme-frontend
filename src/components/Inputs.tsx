// import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from "polished";

const Input = styled.input`
  height: 35px;
  
  background: #EBF2F5;
  border: none;
  border-radius: 5px;
  padding: 5px;
  transition: outline 2s;

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const Option = styled.option`
  height: 35px;
  
  background-color: #EBF2F5;
  border: none;
  padding: 5px;

  :hover {
    background-color: #4D6F80;
  }
`;

const Select = styled.select`
  height: 35px;
  
  background: #EBF2F5;
  border: none;
  border-radius: 5px;
  padding: 5px;

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const TextArea = styled.textarea`
  background: #EBF2F5;
  border: none;
  border-radius: 5px;
  padding: 5px;

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const File = styled.input`
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: 'Select some files';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
`;

export {
  Input,
  Select,
  Option,
  TextArea,
  File
}