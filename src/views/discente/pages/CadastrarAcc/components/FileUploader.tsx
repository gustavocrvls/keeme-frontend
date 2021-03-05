import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Noty from 'noty';

import { FiFile } from 'react-icons/fi';

import * as fileConstants from '../../../../../constants/files';
import stylesConsts from '../../../../../constants/styles';

const Button = styled.button`
  height: ${stylesConsts.inputHeight};

  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #8fa7b2;

  display: flex;
  align-items: center;

  font-size: 14px;
  text-decoration: none;
  text-align: left;
  color: #4d6f80;

  width: 100%;

  cursor: pointer;

  :hover {
    outline: #4d6f80 auto 5px;
  }

  :focus {
    outline: #4d6f80 auto 5px;
  }
`;

interface Props {
  handleFile: (files: Blob) => void;
  id: string;
}

const FileUploader = (props: Props): JSX.Element => {
  const [fileName, setFileName] = useState('');

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleButton = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fileInput = hiddenFileInput.current;
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
          text: 'Arquivo muito grande! (máx: 2MB)',
        }).show();
      } else {
        setFileName(files[0].name);

        props.handleFile(files[0]);
      }
    }
  };

  const { id } = props;

  return (
    <>
      <Button onClick={handleButton}>
        <FiFile style={{ marginRight: 5 }} />
        {fileName || 'Escolher um Arquivo'}
      </Button>
      <input
        id={id}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default FileUploader;
