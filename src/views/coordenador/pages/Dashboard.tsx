/* eslint-disable camelcase */
import React, { Component } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import constStatusDaAcc from '../../../constants/statusDaAcc';
import api from '../../../services/api';

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
  usuario: {
    curso: {
      id: number;
      nome: string;
    };
    id: number;
    nome: string;
  };
}

interface IProps {}

interface IState {
  accs: Array<IAcc>;
}

class Dashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accs: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get(
      `accs/status/${constStatusDaAcc.EM_ANALISE}`,
    );

    this.setState({
      accs: response.data,
    });
  }

  render(): JSX.Element {
    const { accs } = this.state;

    return (
      <div>
        <h1>ACCs Recebidas</h1>
        <div>
          <div
            style={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {`${accs.length} ACCs`}
          </div>
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
                  <div>
                    <div>
                      <strong>{acc.usuario.nome}</strong>
                    </div>
                    <div>{acc.tipo_de_acc.nome}</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FiArrowRight size={20} />
                  </div>
                </div>
              </li>
            ))}

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
                <div>
                  <div>
                    <strong>Gustavo Carvalho Silva</strong>
                  </div>
                  <div>
                    Apresentação de trabalho em em eventos (Simpósios,
                    Congressos, Workshops, Oficinas, etc.) nas áreas dos cursos
                    da Faceel
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FiArrowRight size={20} />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;
