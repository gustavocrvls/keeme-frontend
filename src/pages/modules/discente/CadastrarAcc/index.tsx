import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../../../services/api';
import { Link } from 'react-router-dom';
import { Card } from '../../../../components/Card';
import { Input, Select, Option, TextArea, File } from '../../../../components/Inputs';
import styled from 'styled-components';
import FileUploader from './components/FileUploader';
import { Button } from '../../../../components/Button';

interface TipoDeAcc {
  id: number,
  nome: string,
  limite_de_pontos: number,
  completed: number,
  pontuacao: number,
  unidade_de_medida: {
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
  
  const [idTipoDeAcc, setIdTipoDeAcc] = useState<Number>();
  const [cargaHoraria, setCargaHoraria] = useState<Number>();
  const [descricao, setDescricao] = useState<String>();
  const [certificado, setCertificado] = useState<Blob>();
  
  const handleFile = (files: Blob) => {
    setCertificado(files);
  }

  const cadastrarAcc = () => {
    let formData = new FormData();

    let file = certificado || new Blob();
    
    formData.append("sobre", "teste");
    formData.append("quantidade", "40");
    formData.append("idUsuario", "3");
    formData.append("tipoDeAcc", "3");
    formData.append("certificado", file);
    
    api.post('accs/create', formData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })
  }

  const loadTiposDeAcc = async () => {
    const response = await api.get('tipos-de-acc');
    setTiposDeAcc(response.data);
  }

  useEffect(() => {
    loadTiposDeAcc();
  }, []);

  return (
    <div className="container">
      <Card>
        <div className="page-title" style={{ marginBottom: '10px' }}>
          <Link to="/home" className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }} /></Link>
          <div className="title">
            Cadastrar ACC
            </div>
        </div>
          <Flex>
            <div style={{ width: '80%', marginRight: '10px' }}>
              <label htmlFor="tipo-de-acc">Tipo de Acc</label>
              <Select id="tipo-de-acc" style={{ width: '100%' }}>
                {
                  tiposDeAcc.map(tipoDeAcc => (
                    <Option value={tipoDeAcc.id} key={tipoDeAcc.id}>{tipoDeAcc.nome}</Option>
                  ))
                }
              </Select>
            </div>
            <div style={{ width: '20%' }}>
              <label htmlFor="tipo-de-acc">Carga Horária</label>
              <Input placeholder="Carga Horária" style={{ width: '100%' }}></Input>
            </div>
          </Flex>
          <Flex>
            <div style={{ width: '100%' }}>
              <label htmlFor="descricao">Descrição:</label>
              <TextArea style={{ width: '100%' }} rows={10}></TextArea>
            </div>
          </Flex>
          <Flex>
            <div style={{ width: '100%' }}>
              <label htmlFor="certificado">Certificado:</label>
              <FileUploader handleFile={handleFile} />
            </div>
          </Flex>
          <Flex style={{ justifyContent: 'flex-end' }}>
            <Button color="#31878C" onClick={cadastrarAcc}>Cadastrar</Button>
          </Flex>
      </Card>
    </div>
  )

}