/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../../services/api';
import { Input, Select, Option, TextArea } from '../../../../components/Inputs';
import FileUploader from './components/FileUploader';
import { Button } from '../../../../components/Button';

import * as unidadesDeMedidaConstants from '../../../../constants/unidadesDeMedida';
import { notifySuccess } from '../../../../utils/Notifications';
import { TOKEN_KEY, USERID_KEY } from '../../../../services/auth';

interface TipoDeAcc {
  id: number;
  nome: string;
  limiteDePontos: number;
  completed: number;
  pontuacao: number;
  unidadeDeMedida: {
    id: number;
    nome: string;
  };
  pontosPorUnidade: number;
}

const Flex = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 10px;
`;

export default function CadastrarAcc() {
  const [tiposDeAcc, setTiposDeAcc] = useState(new Array<TipoDeAcc>());
  const [idTipoDeAcc, setIdTipoDeAcc] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [certificado, setCertificado] = useState<Blob>();

  const history = useHistory();

  const handleFile = (files: Blob) => {
    setCertificado(files);
  };

  const handleCargaHoraria = (e: ChangeEvent<HTMLInputElement>) => {
    const carga = e.target.value.replace(/\D/g, '');
    setQuantidade(carga);
  };

  const handleDescricao = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
  };

  const handleIdTipoDeAcc = (e: ChangeEvent<HTMLSelectElement>) => {
    setIdTipoDeAcc(e.target.value);
  };

  const verifyTipoDeAcc = () => {
    const tipo = tiposDeAcc.find(t => t.id === Number(idTipoDeAcc));

    switch (tipo?.unidadeDeMedida.id) {
      case unidadesDeMedidaConstants.HORA:
        return 'Quantidade de Horas';
      case unidadesDeMedidaConstants.EVENTO:
        return 'Quantidade de Eventos';
      case unidadesDeMedidaConstants.SEMESTRE:
        return 'Quantidade de Semestres';
      case unidadesDeMedidaConstants.VISITA:
        return 'Quantidade de Visitas';
      case unidadesDeMedidaConstants.PALESTRA:
        return 'Quantidade de Palestras';
      case unidadesDeMedidaConstants.TRABALHO:
        return 'Quantidade de Trabalhos';
      case unidadesDeMedidaConstants.CERTIFICADO:
        return 'Quantidade de Certificados';
      default:
        return 'Quantidade de Horas';
    }
  };

  const cadastrarAcc = async () => {
    const formData = new FormData();

    const file = certificado || new Blob();
    const userID = sessionStorage.getItem(USERID_KEY) || '';

    formData.append('sobre', descricao);
    formData.append('quantidade', quantidade);
    formData.append('idUsuario', userID);
    formData.append('tipoDeAcc', idTipoDeAcc);
    formData.append('certificado', file);

    const response = await api.post('accs/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`,
      },
    });

    if (response.status === 201) {
      notifySuccess('ACC cadastrada com sucesso!');
      history.push('/home');
    }
  };

  const loadTiposDeAcc = async () => {
    const response = await api.get('tipos-de-acc');
    setTiposDeAcc(response.data);
  };

  useEffect(() => {
    loadTiposDeAcc();
  }, []);

  return (
    <>
      <div className="page-title">
        <Link to="/home" className="btn back-button">
          <FiArrowLeft style={{ strokeWidth: 2 }} />
        </Link>
        <div className="title">Detalhes da Acc</div>
      </div>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="tipo-de-acc">
            Tipo de Acc
            <Select
              value={idTipoDeAcc}
              onChange={handleIdTipoDeAcc}
              id="tipo-de-acc"
              style={{ width: '100%' }}
            >
              <Option>Selecione...</Option>
              {tiposDeAcc.map(tipoDeAcc => (
                <Option value={tipoDeAcc.id} key={tipoDeAcc.id}>
                  {tipoDeAcc.nome}
                </Option>
              ))}
            </Select>
          </label>
        </div>
      </Flex>
      <div style={{ width: '50%' }}>
        <label htmlFor="quantidade">{verifyTipoDeAcc()}</label>
        <Input
          id="quantidade"
          placeholder={verifyTipoDeAcc()}
          style={{ width: '100%' }}
          value={quantidade}
          onChange={handleCargaHoraria}
        />
      </div>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="descricao">
            Descrição:
            <TextArea
              id="descricao"
              style={{ width: '100%' }}
              rows={10}
              value={descricao}
              onChange={handleDescricao}
            />
          </label>
        </div>
      </Flex>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="certificado">
            Certificado:
            <FileUploader handleFile={handleFile} />
          </label>
        </div>
      </Flex>
      <Flex style={{ justifyContent: 'center' }}>
        <Button color="primary" onClick={cadastrarAcc}>
          Cadastrar
        </Button>
      </Flex>
    </>
  );
}
