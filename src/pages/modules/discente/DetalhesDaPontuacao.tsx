import React from 'react';
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCircle, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import statusDaAccConsts from '../../../constants/statusDaAcc';
import { Container } from '../../../components/Containers';
import api from '../../../services/api';
import { USERID_KEY } from '../../../services/auth';

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

interface IState {
  accs: Array<Acc>;
}

interface ICardAcc {
  id: number,
  pontos: number,
  quantidade: number,
  status_da_acc: {
    id: number,
    nome: string,
  },
  tipoDeAcc: {
    id: number,
    nome: string,
    unidade_de_medida: {
      id: number,
      nome: string,
    }
  },
}

export function CardAcc(props: ICardAcc) {
  const Card = styled.div`
    box-sizing: border-box;

    border: 1px solid #f1f3f5;
    box-shadow: 1px 1px 5px #b5c3c9;
    width: 100%;
    border-radius: 3px;
    padding: 10px;

    font-size: 14px;
  `;

  const CardTitle = styled.div`
    font-size: 16px;
    margin-bottom: 8px;
    color: #4D6F80;
  `;

  const CardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    color: #8FA7B3;

    strong {
      color: #4D6F80;
    }

    ul {
      padding-left: 0;
      list-style: none;
      display: flex;

      li {
        margin-right: 10px;
      }
    }
  `;

  const ArrowLink = styled.div`
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `;

  interface IStatus {
    id: number,
    nome: string
  }

  const handleStatusColor = (status: IStatus) => {
    let color = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case statusDaAccConsts.EM_ANALISE:
          color = '#8FA7B2';
          Icon = <FiCircle style={{ marginRight: 5 }} />
          break;
        case statusDaAccConsts.APROVADA:
          color = '#31878C';
          Icon = <FiCheckCircle style={{ marginRight: 5 }} />
          break;
        case statusDaAccConsts.NEGADA:
          color = '#DE4079';
          Icon = <FiXCircle style={{ marginRight: 5 }} />
          break;

        default:
          break;
      }

    return (
      <span style={{ fontSize: 12, backgroundColor: color, padding: '2px 5px', color: '#fff', borderRadius: 3, display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}>
        {Icon}{status.nome}
      </span>
    );
  }

  return (
    <Card style={{ display: 'flex' }} >
      <div style={{ width: "90%" }}>
        <CardTitle>
          <strong>{props.tipoDeAcc.nome} - {props.pontos}pts</strong>
        </CardTitle>
        <CardContent>
          <ul style={{ width: "100%" }}>
            <li style={{ minWidth: "20%" }}>{props.tipoDeAcc.unidade_de_medida.nome}s: <strong>{props.quantidade}</strong></li>
            <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ marginRight: 5 }}>Status: </span>{handleStatusColor({ id: props.status_da_acc.id, nome: props.status_da_acc.nome })}</li>
          </ul>
        </CardContent>
      </div>
      <ArrowLink>
        <Link to={`detalhes-da-pontuacao/acc/${props.id}`}><FiArrowRight size="20" /></Link>
      </ArrowLink>
    </Card>
  );
}

export default class DetalhesDaPontuacao extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accs: [],
    }
  }

  async componentDidMount() {
    let response = await api.get(`accs/user/${sessionStorage.getItem(USERID_KEY)}/completo`);
    this.setState({
      accs: response.data.accs
    });
  }

  render() {
    const {
      accs
    } = this.state;

    return (
      <Container>
        <div className="page-title">
          <Link to="/home" className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }} /></Link>
          <div className="title">
            Detalhes da Pontuação
          </div>
        </div>

        <ul className="card-list">
          {
            accs.map(acc => (
              <li key={acc.id} className="card-list-item">
                <CardAcc
                  id={acc.id}
                  pontos={acc.pontos}
                  quantidade={acc.quantidade}
                  status_da_acc={acc.status_da_acc}
                  tipoDeAcc={acc.tipo_de_acc}
                />
              </li>
            ))
          }
        </ul>
      </Container>
    )
  }
}