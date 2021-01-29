import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCircle, FiDownload, FiXCircle } from 'react-icons/fi';
import apiCalls from '../../../services/apiCalls';
import statusDaAccConsts from '../../../constants/statusDaAcc';
import { FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import { AnchorButton, Button } from '../../../components/Button';
import { Container } from '../../../components/Containers';

interface IParams {
  id: string
}

interface IAcc {
  id: number,
  id_certificado: number,
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

interface IStatus {
  id: number,
  nome: string
}

const Details = styled.div`
  margin-top: 10px;

  div {
    margin-bottom: 5px;
  }
`;

export default function DetalhesDaAcc() {
  const [acc, setAcc] = useState<IAcc>();

  const { id } = useParams<IParams>();

  const loadDetalhesAcc = async () => {
    let response = await apiCalls.discente.getDetalhesAcc(id);
    setAcc(response.data);
    console.log(response.data);
    
  }

  const handleStatusColor = (status?: IStatus) => {
    let color = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case statusDaAccConsts.EM_ANALISE:
          color = '#8FA7B2';
          Icon = <FiCircle style={{marginRight: 5}} />
          break;
        case statusDaAccConsts.APROVADA:
          color = '#31878C';
          Icon = <FiCheckCircle style={{marginRight: 5}} />
          break;
          case statusDaAccConsts.NEGADA:
            color = '#DE4079';
            Icon = <FiXCircle style={{marginRight: 5}} />
          break;

        default:
          break;
      }

    return (
      <span style={{ fontSize: 12, backgroundColor: color, padding: '2px 5px', color: '#fff', borderRadius: 3, display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}>
        {Icon}{status?.nome}
      </span>
    );
  }


  useEffect(() => {
    loadDetalhesAcc();
  },[]);

  return (
    <Container>
      <div className="page-title">
        <Link to="/home" className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }} /></Link>
        <div className="title">
          Detalhes da Acc
        </div>
      </div>
      <Details>
        <div>
          <label>Tipo de Acc</label>
          <p>{acc?.tipo_de_acc.nome}</p>
        </div>
        <div>
          <label>Status</label>
          <p>{handleStatusColor(acc?.status_da_acc)}</p>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%' }}>
            <label>{acc?.tipo_de_acc.unidade_de_medida.nome}s</label>
            <p>{acc?.quantidade}</p>
          </div>
          <div>
            <label>Pontuação</label>
            <p>{acc?.pontos}</p>
          </div>
        </div>
        <div>
          <label>Descrição</label>
          <p>{acc?.sobre}</p>
        </div>
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <AnchorButton color="primary" className="btn" href={`http://localhost:3333/certificados/${acc?.id_certificado}`}><FiDownload /> Baixar Certificado</AnchorButton>
        </div>
      </Details>
    </Container>
  )
}