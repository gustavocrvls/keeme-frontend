/* eslint-disable camelcase */
import React from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCircle,
  FiXCircle,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import STATUS_DA_ACC from '../../../../../../constants/StatusDaACC';

interface ICardAcc {
  id: number;
  pontos: number;
  quantidade: number;
  statusDaAcc: {
    id: number;
    nome: string;
  };
  tipoDeAcc: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
}

export function CardAcc(props: ICardAcc): JSX.Element {
  const color = {
    primary: '#31878C',
    secondary: '#C7C7C7',
    danger: '#BD3939',
  };

  interface Color {
    color: 'primary' | 'secondary' | 'danger';
  }

  const PreCard = styled.div`
    box-sizing: border-box;

    background-color: ${(conf: Color) => color[conf.color]};
    width: 100%;
    border-radius: 5px 0 0 5px;

    width: 15px;
  `;

  const Card = styled.div`
    box-sizing: border-box;

    box-shadow: 1px 1px 5px #b5c3c9;
    width: 100%;
    border-radius: 0 5px 5px 0;
    padding: 10px;

    font-size: 14px;
  `;

  const CardTitle = styled.div`
    font-size: 16px;
    margin-bottom: 8px;
  `;

  const CardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

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
    id: number;
    nome: string;
  }

  const handleStatusColor = (status: IStatus) => {
    let statusColor = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case STATUS_DA_ACC.EM_ANALISE:
          statusColor = '#8FA7B2';
          Icon = <FiCircle style={{ marginRight: 5 }} />;
          break;
        case STATUS_DA_ACC.APROVADA:
          statusColor = '#31878C';
          Icon = <FiCheckCircle style={{ marginRight: 5 }} />;
          break;
        case STATUS_DA_ACC.NEGADA:
          statusColor = '#DE4079';
          Icon = <FiXCircle style={{ marginRight: 5 }} />;
          break;

        default:
          break;
      }

    return (
      <span
        style={{
          fontSize: 12,
          backgroundColor: statusColor,
          padding: '2px 5px',
          color: '#fff',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          width: 120,
          justifyContent: 'center',
        }}
      >
        {Icon}
        {status.nome}
      </span>
    );
  };

  const handleStatusColorPreCard = (
    status: IStatus,
  ): 'primary' | 'secondary' | 'danger' => {
    if (status.id === STATUS_DA_ACC.EM_ANALISE) return 'secondary';
    if (status.id === STATUS_DA_ACC.APROVADA) return 'primary';
    if (status.id === STATUS_DA_ACC.NEGADA) return 'danger';

    return 'secondary';
  };

  const { id, statusDaAcc, tipoDeAcc, pontos, quantidade } = props;

  return (
    <>
      <PreCard
        color={handleStatusColorPreCard({
          id: statusDaAcc.id,
          nome: statusDaAcc.nome,
        })}
      >
        {' '}
      </PreCard>
      <Card style={{ display: 'flex' }}>
        <div style={{ width: '90%' }}>
          <CardTitle>
            <strong>{`${tipoDeAcc.nome}-${pontos}pts`}</strong>
          </CardTitle>
          <CardContent>
            <ul style={{ width: '100%' }}>
              <li style={{ minWidth: '20%' }}>
                {`${tipoDeAcc.unidade_de_medida.nome}s:`}
                <strong>{quantidade}</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 5 }}>Status: </span>
                {handleStatusColor({
                  id: statusDaAcc.id,
                  nome: statusDaAcc.nome,
                })}
              </li>
            </ul>
          </CardContent>
        </div>
        <ArrowLink>
          <Link to={`minhas-accs/acc/${id}`}>
            <FiArrowRight size="20" />
          </Link>
        </ArrowLink>
      </Card>
    </>
  );
}
