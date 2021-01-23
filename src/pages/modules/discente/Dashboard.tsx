import React from 'react';
import { FiFile, FiPackage, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../../../components/Card';
import ProgressRing from '../../../components/ProgressRing';
import { darken } from "polished";
import { Container } from '../../../components/Containers';
import { CardAcc } from './DetalhesDaPontuacao';
import api from '../../../services/api';
import { USERID_KEY } from '../../../services/auth';


const CardLink = styled.div`
  width: 100%;
  height: 100px;

  padding: 15px;
  
  box-shadow: 1px 1px 5px 0px rgba(119, 119, 119, 0.25);
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  transition: all 0.2s;
  
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    text-decoration: none;
  }

  &:hover{
    background-color: ${darken(0.05, '#f1f3f5')};
    box-shadow: 1px 1px 2px 0px rgba(119, 119, 119, 0.25);
  }
`;

interface Acc {
  id: number,
  pontos: number,
  quantidade: number,
  sobre: string,
  status_da_acc: {
    id: number,
    nome: string,
  },
  tipo_de_acc: {
    id: number,
    nome: string,
    unidade_de_medida: {
      id: number,
      nome: string,
    }
  },
}

interface IProps {
}

interface IResumoDaPontuacao {
  pontosAprovados: number,
  pontosEmAnalise: number,
  pontosNegados: number
}

interface IState {
  progress: number,
  lastAccs: Array<Acc>,
  resumo: IResumoDaPontuacao,
  progresso: number,
}



export default class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      progress: 0,
      lastAccs: [],
      resumo: {
        pontosAprovados: 0,
        pontosEmAnalise: 0,
        pontosNegados: 0,
      },
      progresso: 0
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        progress: this.state.progress + 10
      })
    }, 500);

    let response = await api.get(`accs/user/${sessionStorage.getItem(USERID_KEY)}/completo`);

    let progresso = Number((100 * response.data.resumo.pontosAprovados) / 51).toFixed(0)

    this.setState({
      lastAccs: response.data.accs,
      resumo: response.data.resumo,
      progresso: Number(progresso),
    });
  }

  render() {

    const {
      lastAccs,
      resumo,
      progresso,
    } = this.state;

    return (
      <Container>
        <div className="page-title">
          <div className="title" style={{ marginLeft: 0, marginBottom: 10 }}>
            Minha Pontuação
          </div>
        </div>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProgressRing
              stroke={10}
              radius={60}
              progress={progresso}
            >
              {resumo.pontosAprovados}/51
            </ProgressRing>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginRight: 10 }}>Aprovadas: </span><strong>{resumo.pontosAprovados}pts</strong></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginRight: 10 }}>Em análise: </span><strong>{resumo.pontosEmAnalise}pts</strong></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginRight: 10 }}>Negadas: </span><strong>{resumo.pontosNegados}pts</strong></li>
              </ul>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Link to="/discente/cadastrar-acc" color="primary" style={{ width: '30%', textDecoration: 'none' }}>
            <CardLink>
              <div>
                <div><FiPlus /></div>
                <div>Nova Acc</div>
              </div>
            </CardLink>
          </Link>
          <Link to="/discente/detalhes-da-pontuacao" color="primary" style={{ width: '30%', textDecoration: 'none' }}>
            <CardLink>
              <div>
                <div><FiFile /></div>
                <div>Minhas ACCs</div>
              </div>
            </CardLink>
          </Link>
          <Link to="/discente/tipos-de-acc" color="primary" style={{ width: '30%', textDecoration: 'none' }}>
            <CardLink>
              <div>
                <div><FiPackage /></div>
                <div>Tipos de ACC</div>
              </div>
            </CardLink>
          </Link>
        </div>


        <div className="page-title">
          <div className="title" style={{ margin: '20px 0' }}>
            Últimos Envios
          </div>
        </div>


        <ul className="card-list">
          {
            lastAccs.map((acc, index) => (
              <>
                {
                  index <= 3
                    ?
                    <li key={acc.id} className="card-list-item">
                      <CardAcc
                        id={acc.id}
                        pontos={acc.pontos}
                        quantidade={acc.quantidade}
                        status_da_acc={acc.status_da_acc}
                        tipoDeAcc={acc.tipo_de_acc}
                      />
                    </li>
                    :
                    <>
                    </>
                }
              </>
            ))
          }
        </ul>

      </Container>
    );
  }
}