import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCircle, FiXCircle } from 'react-icons/fi';
import apiCalls from '../../../services/apiCalls';
import statusDaAccConsts from '../../../constants/statusDaAcc';
import { FiCheckCircle } from 'react-icons/fi';

interface IParams {
  id: string
}

interface IAcc {
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

interface IStatus {
  id: number,
  nome: string
}

export default function DetalhesDaAcc() {
  const [acc, setAcc] = useState<IAcc>();

  const { id } = useParams<IParams>();

  const loadDetalhesAcc = async () => {
    let response = await apiCalls.discente.getDetalhesAcc(id);
    setAcc(response.data);
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
      <span style={{ backgroundColor: color, padding: '2px 5px', color: '#fff', borderRadius: 3, display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}>
        {Icon}{status?.nome}
      </span>
    );
  }


  useEffect(() => {
    loadDetalhesAcc();
  },[]);

  return (
    <div className="container">
      <div className="page-title">
        <Link to="/home" className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }} /></Link>
        <div className="title">
          Detalhes da Acc
        </div>
      </div>
      <div>
        <div>
          <label>Tipo de Acc</label>
          <div>{acc?.tipo_de_acc.nome}</div>
        </div>
        <div>
          <label>Status</label>
          <div>{acc?.status_da_acc.nome}</div>
        </div>
        <div>
          <label>Status</label>
          <div>{handleStatusColor(acc?.status_da_acc)}</div>
        </div>
        <div>
          <label>{acc?.tipo_de_acc.unidade_de_medida.nome}s</label>
          <div>{acc?.quantidade}</div>
          <label>Pontuação</label>
          <div>{acc?.pontos}</div>
        </div>
        <div>
          <label>Descrição</label>
          <div>{acc?.sobre}</div>
        </div>
        <div>
          <a href={`http://localhost:3333/certificados/${id}`}>Baixar Certificado</a>
        </div>
      </div>
    </div>
  )
}