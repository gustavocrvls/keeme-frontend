import React, { ChangeEvent, useState } from 'react';

import { FiFile } from 'react-icons/fi';

import { Button } from '@chakra-ui/react';
import { SIZE, SUPORTED_TYPES } from '../../../../../constants/Certificado';
import { notifyError } from '../../../../../components/Notifications';

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
      if (files[0].size > SIZE) {
        files = [];
        setFileName('');

        notifyError('Arquivo muito grande! (máx: 2MB)');
      } else {
        setFileName(files[0].name);

        props.handleFile(files[0]);
      }
    }
  };

  const { id } = props;

  return (
    <>
      <Button
        width="100%"
        onClick={handleButton}
        variant="outline"
        textAlign="left"
        justifyContent="start"
        leftIcon={<FiFile style={{ marginRight: 5 }} />}
      >
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
