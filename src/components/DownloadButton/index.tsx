import { Button, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface DownloadButtonProps {
  filename: string;
  fileUrl: string;
  label?: string;
}

export function DownloadButton({
  filename,
  fileUrl,
  label = 'Baixar Arquivo',
}: DownloadButtonProps): JSX.Element {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const download = (url: string, name: string) => {
    if (!url) {
      throw new Error('Resource URL not provided! You need to provide one');
    }
    setFetching(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.style.display = 'none';

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  return (
    <Button
      isLoading={fetching}
      isDisabled={fetching}
      loadingText="Baixando..."
      onClick={() => download(fileUrl, filename)}
      aria-label="download file"
      colorScheme="gray"
      leftIcon={<Icon as={FiDownload} />}
    >
      {label}
    </Button>
  );
}
