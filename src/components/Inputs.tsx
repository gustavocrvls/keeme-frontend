import styled from 'styled-components';
import STYLES from '../constants/Styles';

const borderColor = '#8FA7B2';

const Input = styled.input`
  height: ${STYLES.inputHeight};

  border: 1px solid ${borderColor};
  border-radius: ${STYLES.borderRadius};
  padding: 0 5px;
  transition: outline 2s;

  :focus {
    outline: #8fa7b3 auto 1px;
  }
`;

const Option = styled.option`
  height: ${STYLES.inputHeight};

  border: 1px solid ${borderColor};
  padding: 5px;

  :focus {
    outline: #8fa7b3 auto 1px;
  }
`;

const Select = styled.select`
  height: ${STYLES.inputHeight};

  border: 1px solid ${borderColor};

  border-radius: ${STYLES.borderRadius};
  padding: 5px;

  :focus {
    outline: #8fa7b3 auto 1px;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid ${borderColor};
  border-radius: ${STYLES.borderRadius};
  padding: 5px;

  :focus {
    outline: #8fa7b3 auto 1px;
  }
`;

const File = styled.input`
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
`;

export { Input, Select, Option, TextArea, File };
