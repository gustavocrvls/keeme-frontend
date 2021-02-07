/* eslint-disable camelcase */
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from '../../../components/Card';
import ProgressRing from '../../../components/ProgressRing';
import api from '../../../services/api';
import { notifyError } from '../../../utils/Notifications';

interface IUsuario {
  id: number;
  nome: string;
  username: string;
  curso: {
    id: number;
    nome: string;
  };
}

interface IAcc {
  id: number;
  id_certificado: number;
  pontos: number;
  quantidade: number;
  sobre: string;
  status_da_acc: {
    id: number;
    nome: string;
  };
  tipo_de_acc: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
}

interface IResumoDaPontuacao {
  pontosAprovados: number;
  pontosEmAnalise: number;
  pontosNegados: number;
}

interface IState {
  discente: IUsuario;
  accs: Array<IAcc>;
  resumo: IResumoDaPontuacao;
  progresso: number;
}

interface IMatchParams {
  id: string;
}

type IMatchProps = RouteComponentProps<IMatchParams>;

class DetalhesDoDiscente extends Component<IMatchProps, IState> {
  constructor(props: IMatchProps) {
    super(props);
    this.state = {
      discente: {
        id: 0,
        nome: '',
        username: '',
        curso: {
          id: 0,
          nome: '',
        },
      },
      accs: [],
      resumo: {
        pontosAprovados: 0,
        pontosEmAnalise: 0,
        pontosNegados: 0,
      },
      progresso: 0,
    };
  }

  async componentDidMount(): Promise<void> {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    try {
      const responseUsuario = await api.get(`usuarios/${id}`);
      const responseAccs = await api.get(`accs/user/${id}/completo`);

      const progresso = Number(
        (100 * responseAccs.data.resumo.pontosAprovados) / 51,
      ).toFixed(0);

      this.setState({
        discente: responseUsuario.data,
        accs: responseAccs.data.accs,
        progresso: Number(progresso),
        resumo: responseAccs.data.resumo,
      });
    } catch (err) {
      notifyError('Ops, algo deu errado... Tente novamente!');
    }
  }

  render(): JSX.Element {
    const { discente, accs, resumo, progresso } = this.state;

    return (
      <div>
        <h1>Detalhes do Discente</h1>
        <Card>
          <h2>{discente.nome}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProgressRing stroke={10} radius={60} progress={progresso}>
              {resumo.pontosAprovados}
              /51
            </ProgressRing>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
              }}
            >
              <ul style={{ listStyle: 'none' }}>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Aprovadas: </span>
                  <strong>
                    {resumo.pontosAprovados}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Em análise: </span>
                  <strong>
                    {resumo.pontosEmAnalise}
                    pts
                  </strong>
                </li>
                <li
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ marginRight: 10 }}>Negadas: </span>
                  <strong>
                    {resumo.pontosNegados}
                    pts
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
            }}
          >
            {accs.map(acc => (
              <li>
                <div
                  style={{
                    fontSize: '.9rem',
                    backgroundColor: '#fff',
                    boxShadow: '2px 2px 5px #c9c9c9',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,

                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>{acc.tipo_de_acc.nome}</div>
                  <div>
                    {`${acc.quantidade} ${acc.tipo_de_acc.unidade_de_medida.nome}s`}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(DetalhesDoDiscente);
