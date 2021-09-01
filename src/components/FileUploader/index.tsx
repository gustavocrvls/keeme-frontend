import React, { ChangeEvent, useState } from 'react';

import { FiFile } from 'react-icons/fi';

import { Button } from '@chakra-ui/react';
import { SIZE, SUPORTED_TYPES } from '../../constants/Certificate';
import { notifyError } from '../Notifications';
import { FileUploaderProps } from './dtos';

export function FileUploader({
  id,
  handleFile,
}: FileUploaderProps): JSX.Element {
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
        return;
      }

      if (!SUPORTED_TYPES.includes(files[0].type)) {
        files = [];
        setFileName('');

        notifyError(
          'Tipo de arquivo não suportado! (Tipos suportados: jpeg, jpg, png e pdf)',
        );
        return;
      }

      setFileName(files[0].name);
      handleFile(files[0]);
    }
  };

  return (
    <>
      <Button
        width="100%"
        onClick={handleButton}
        variant="outline"
        fontWeight="normal"
        textAlign="left"
        justifyContent="start"
        marginTop="2"
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
}
