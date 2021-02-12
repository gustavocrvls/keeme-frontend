/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCircle,
  FiDownload,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import styled from 'styled-components';

import statusDaAccConsts from '../../../constants/statusDaAcc';
import { AnchorButton } from '../../../components/Button';
import { Container } from '../../../components/Containers';
import api from '../../../services/api';

interface IParams {
  id: string;
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

interface IStatus {
  id: number;
  nome: string;
}

const Details = styled.div`
  margin-top: 10px;

  div {
    margin-bottom: 5px;
  }
`;

export default function DetalhesDaAcc(): JSX.Element {
  const [acc, setAcc] = useState<IAcc>();

  const { id } = useParams<IParams>();

  const handleStatusColor = (status?: IStatus) => {
    let color = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case statusDaAccConsts.EM_ANALISE:
          color = '#8FA7B2';
          Icon = <FiCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.APROVADA:
          color = '#31878C';
          Icon = <FiCheckCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.NEGADA:
          color = '#DE4079';
          Icon = <FiXCircle style={{ marginRight: 5 }} />;
          break;

        default:
          break;
      }

    return (
      <span
        style={{
          fontSize: 12,
          backgroundColor: color,
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
        {status?.nome}
      </span>
    );
  };

  useEffect(() => {
    const loadDetalhesAcc = async () => {
      const response = await api.get(`accs/${id}`);
      setAcc(response.data);
    };

    loadDetalhesAcc();
  }, []);

  return (
    <>
      <div className="page-title">
        <Link to="/home" className="btn back-button">
          <FiArrowLeft style={{ strokeWidth: 2 }} />
        </Link>
        <div className="title">Detalhes da Acc</div>
      </div>
      <Details>
        <div>
          <label htmlFor="tipo">
            Tipo de Acc
            <p id="tipo">{acc?.tipo_de_acc.nome}</p>
          </label>
        </div>
        <div>
          <label htmlFor="status">
            Status
            <p id="status">{handleStatusColor(acc?.status_da_acc)}</p>
          </label>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%' }}>
            <label htmlFor="quantidade">
              {`${acc?.tipo_de_acc.unidade_de_medida.nome}s`}
              <p id="quantidade">{acc?.quantidade}</p>
            </label>
          </div>
          <div>
            <label htmlFor="pontuacao">
              Pontuação
              <p id="pontuacao">{acc?.pontos}</p>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="descricao">
            Descrição
            <p id="descricao">{acc?.sobre}</p>
          </label>
        </div>
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <AnchorButton
            color="primary"
            className="btn"
            href={`http://localhost:3333/certificados/${acc?.id_certificado}`}
          >
            <FiDownload />
            Baixar Certificado
          </AnchorButton>
        </div>
      </Details>
    </>
  );
}
