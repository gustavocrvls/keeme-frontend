import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { Card as CardTipoDeAcc } from '../../../components/AccTypes';

import '../../../styles/modules/discente/TiposDeAcc.scss';
import api from '../../../services/api';
import { Container } from '../../../components/Containers';
import { USERID_KEY } from '../../../services/auth';

interface IProps {}

interface TipoDeAcc {
  id: number;
  nome: string;
  limiteDePontos: number;
  completed: number;
  pontuacao: number;
  unidadeDeMedida: {
    nome: string;
  };
  pontosPorUnidade: number;
}

interface IState {
  tiposDeAcc: Array<TipoDeAcc>;
}

export default class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tiposDeAcc: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get(
      `tipos-de-acc/usuario/${sessionStorage.getItem(USERID_KEY)}`,
    );

    const tiposDeAcc = response.data.map((tipoDeAcc: any) => {
      return {
        id: tipoDeAcc.id,
        nome: tipoDeAcc.nome,
        limiteDePontos: tipoDeAcc.limite_de_pontos,
        completed: tipoDeAcc.completed,
        pontuacao: tipoDeAcc.pontuacao,
        unidadeDeMedida: {
          nome: tipoDeAcc.unidade_de_medida.nome,
        },
        pontosPorUnidade: tipoDeAcc.pontos_por_unidade,
      };
    });

    this.setState({ tiposDeAcc });
  }

  render(): JSX.Element {
    const { tiposDeAcc } = this.state;

    return (
      <Container>
        <div className="page-title">
          <Link to="/home" className="btn back-button">
            <FiArrowLeft style={{ strokeWidth: 2 }} />
          </Link>
          <div className="title">Tipos de ACC</div>
        </div>
        <ul className="card-list">
          {tiposDeAcc.map(tipo => (
            <li key={tipo.id} className="card-list-item">
              <CardTipoDeAcc
                name={tipo.nome}
                limit={tipo.limiteDePontos}
                completed={tipo.pontuacao ? tipo.pontuacao : 0}
                measurementUnity={tipo.unidadeDeMedida.nome}
                pointsPerUnity={tipo.pontosPorUnidade}
              />
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
