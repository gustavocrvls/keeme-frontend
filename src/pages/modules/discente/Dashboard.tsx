import React from 'react';
import { LinkButton } from '../../../components/Button';

export default class Home extends React.Component {
  render () {
    return (
      <div className="container">
        <h2>Minha Pontuação</h2>

        <div>
          <LinkButton to="/discente/tipos-de-acc" color="#31878C">Tipos de ACC</LinkButton>
          <LinkButton to="/discente/cadastrar-acc" color="#31878C">Cadastrar Acc</LinkButton>
          <LinkButton to="/discente/detalhes-da-pontuacao" color="#31878C">Detalhes da Pontuação</LinkButton>
        </div>
      </div>
    );
  }
}