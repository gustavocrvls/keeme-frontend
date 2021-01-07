import styled from 'styled-components';

const border_color = '#8FA7B2';

const Input = styled.input`
  height: 35px;
  
  border: 1px solid ${border_color};
  border-radius: 5px;
  padding: 5px;
  transition: outline 2s;

  :hover {
    outline: #4D6F80 auto 1px;
  }

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const Option = styled.option`
  height: 35px;
  
  border: 1px solid ${border_color};
  padding: 5px;

  :hover {
    outline: #4D6F80 auto 1px;
  }

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const Select = styled.select`
  height: 35px;
  
  border: 1px solid ${border_color};

  border-radius: 5px;
  padding: 5px;

  :hover {
    outline: #4D6F80 auto 1px;
  }

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid ${border_color};
  border-radius: 5px;
  padding: 5px;

  :hover {
    outline: #4D6F80 auto 1px;
  }

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

const File = styled.input`
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  :hover {
    outline: #4D6F80 auto 1px;
  }

  :focus {
    outline: #4D6F80 auto 1px;
  }
`;

export {
  Input,
  Select,
  Option,
  TextArea,
  File
}