import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Input, Select, Option, TextArea } from '../../../../components/Inputs';
import styled from 'styled-components';
import FileUploader from './components/FileUploader';
import { Button } from '../../../../components/Button';

import * as unidadesDeMedidaConstants from '../../../../constants/unidadesDeMedida';
import { notifySuccess } from '../../../../utils/Notifications';
import apiCalls from '../../../../services/apiCalls';
import { Container } from '../../../../components/Containers';
import { TOKEN_KEY, USERID_KEY } from '../../../../services/auth';

interface TipoDeAcc {
  id: number,
  nome: string,
  limite_de_pontos: number,
  completed: number,
  pontuacao: number,
  unidade_de_medida: {
    id: number,
    nome: string
  },
  pontos_por_unidade: number,
}

const Flex = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 10px;
`;

export default function CadastrarAcc() {
  const [tiposDeAcc, setTiposDeAcc] = useState(new Array<TipoDeAcc>());
  const [idTipoDeAcc, setIdTipoDeAcc] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [certificado, setCertificado] = useState<Blob>();

  let history = useHistory();

  const handleFile = (files: Blob) => {
    setCertificado(files);
  }

  const handleCargaHoraria = (e: ChangeEvent<HTMLInputElement>) => {
    let carga = e.target.value.replace(/\D/g, '');
    setQuantidade(carga);
  }

  const handleDescricao = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value)
  }

  const handleIdTipoDeAcc = (e: ChangeEvent<HTMLSelectElement>) => {
    setIdTipoDeAcc(e.target.value);
  }

  const verifyTipoDeAcc = () => {
    const tipo = tiposDeAcc.find((t) => t.id === Number(idTipoDeAcc));

    switch (tipo?.unidade_de_medida.id) {
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
  }

  const cadastrarAcc = async () => {
    let formData = new FormData();

    let file = certificado || new Blob();
    let userID = sessionStorage.getItem(USERID_KEY) || '';

    console.log(userID);
    

    formData.append("sobre", descricao);
    formData.append("quantidade", quantidade);
    formData.append("idUsuario", userID);
    formData.append("tipoDeAcc", idTipoDeAcc);
    formData.append("certificado", file);

    let response = await api.post('accs/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`
      }
    });

    if (response.status === 201) {
      notifySuccess('ACC cadastrada com sucesso!');
      history.push('/home');
    }
  }

  const loadTiposDeAcc = async () => {
    const response = await apiCalls.discente.getTiposDeAcc();
    setTiposDeAcc(response.data);
  }

  useEffect(() => {
    loadTiposDeAcc();
  }, []);

  return (
    <Container>
      <div className="page-title">
        <Link to="/home" className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }} /></Link>
        <div className="title">
          Detalhes da Acc
        </div>
      </div>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="tipo-de-acc">Tipo de Acc</label>
          <Select value={idTipoDeAcc} onChange={handleIdTipoDeAcc} id="tipo-de-acc" style={{ width: '100%' }}>
            <Option>Selecione...</Option>
            {
              tiposDeAcc.map(tipoDeAcc => (
                <Option value={tipoDeAcc.id} key={tipoDeAcc.id}>{tipoDeAcc.nome}</Option>
              ))
            }
          </Select>
        </div>
      </Flex>
      <div style={{ width: '50%' }}>
        <label htmlFor="quantidade">{verifyTipoDeAcc()}</label>
        <Input id="quantidade" placeholder={verifyTipoDeAcc()} style={{ width: '100%' }} value={quantidade} onChange={handleCargaHoraria} />
      </div>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="descricao">Descrição:</label>
          <TextArea style={{ width: '100%' }} rows={10} value={descricao} onChange={handleDescricao}></TextArea>
        </div>
      </Flex>
      <Flex>
        <div style={{ width: '100%' }}>
          <label htmlFor="certificado">Certificado:</label>
          <FileUploader handleFile={handleFile} />
        </div>
      </Flex>
      <Flex style={{ justifyContent: 'center' }}>
        <Button color="primary" onClick={cadastrarAcc}>Cadastrar</Button>
      </Flex>
    </Container >
  )
}