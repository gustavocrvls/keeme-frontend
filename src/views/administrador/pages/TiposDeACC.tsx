import { Heading } from '@chakra-ui/react';
import React from 'react';
import api from '../../../services/api';

class TiposDeACC extends React.Component {
  componentDidMount() {
    const response = api.get('/tipos-de-acc');
  }

  render(): JSX.Element {
    return (
      <div>
        <Heading as="h1">Tipos de ACC</Heading>
      </div>
    );
  }
}

export default TiposDeACC;
