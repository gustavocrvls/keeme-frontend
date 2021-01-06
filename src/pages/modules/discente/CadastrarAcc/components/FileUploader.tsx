import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { darken } from "polished";
import Noty from 'noty';

import { FiFile } from "react-icons/fi";

import * as fileConstants from '../../../../../constants/files';

const Button = styled.button`
  border: 0;
  padding: 10px;
  border-radius: 5px;
  border: none;

  display: flex;
  align-items: center;

  background-color: #EBF2F5;

  font-size: 14px;
  text-decoration: none;
  text-align: left;

  width: 100%;

  cursor: pointer;

  &:hover {
    background-color: ${() => darken(0.1, '#EBF2F5')};
  }
`;

interface Props {
  handleFile: Function,
}

const FileUploader = (props: Props) => {
  const [fileName, setFileName] = useState('');

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleButton = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fileInput = hiddenFileInput.current;
    fileInput?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files || [];

    if (files[0]) {
      if (files[0].size > fileConstants.MAX_FILE_SIZE) {
        files = [];
        setFileName('');
        
        new Noty({
          theme: 'nest',
          type: 'error',
          layout: 'topRight',
          text: 'Arquivo muito grande! (máx: 2MB)'
        }).show();
      } else {
        setFileName(files[0].name);

        props.handleFile(files[0]);
      }
    }
  };

  return (
    <>
      <Button onClick={handleButton}>
        <FiFile style={{marginRight: 5}} />{ fileName ? fileName : 'Escolher um Arquivo' }
      </Button>
      <input type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display:'none'}} 
      /> 
    </>
  );
};

export default FileUploader;
