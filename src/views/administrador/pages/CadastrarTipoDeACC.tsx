import React from 'react';
import { Heading } from '@chakra-ui/react';
import api from '../../../services/api';

class CadastrarTipoDeACC extends React.Component {
  async componentDidMount(): Promise<void> {
    await api.get('unidades-de-medida');
  }

  render(): JSX.Element {
    return (
      <div>
        <Heading as="h1">Cadastrar Tipo de ACC</Heading>
      </div>
    );
  }
}

export default CadastrarTipoDeACC;
