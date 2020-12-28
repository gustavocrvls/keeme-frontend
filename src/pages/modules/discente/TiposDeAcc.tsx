import React from 'react';

import { Card as CardTipoDeAcc } from '../../../components/AccTypes';
import { FiArrowLeft } from 'react-icons/fi';

import '../../styles/Home.scss'
import api from '../../../services/api';

interface IProps {
}

interface TipoDeAcc {
  id: number,
  nome: string,
  limite_de_pontos: number,
  completed: number,
  pontuacao: number,
  unidade_de_medida: {
    nome: string
  },
  pontos_por_unidade: number,
}

interface IState {
  tiposDeAcc: Array<TipoDeAcc>;
}

export default class Home extends React.Component<IProps, IState> {
  constructor(props : IProps) {
    super(props);
    this.state = {
      tiposDeAcc: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('tipos-de-acc/usuario/5');
    this.setState({ tiposDeAcc : response.data })
  }

  render () {
    const {
      tiposDeAcc
    } = this.state;

    return (
      <div className="container">
        <div className="page-title">
          <button className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }}/></button>
          <div className="title">
            Tipos de ACC
          </div>
        </div>
          <ul className="card-list">
            {
              tiposDeAcc.map(tipo => (
                <li key={tipo.id} className="card-list-item">
                  <CardTipoDeAcc
                    name={tipo.nome}
                    limit={tipo.limite_de_pontos}
                    completed={tipo.pontuacao}
                    measurementUnity={tipo.unidade_de_medida.nome}
                    pointsPerUnity={tipo.pontos_por_unidade}
                  />
                </li>
              ))
            }
          </ul>
      </div>
    )
  }
}