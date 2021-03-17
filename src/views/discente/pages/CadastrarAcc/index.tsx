/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
} from '@chakra-ui/react';
import api from '../../../../services/api';
import FileUploader from './components/FileUploader';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { TOKEN_KEY, USERID_KEY } from '../../../../services/auth';
import PageTitle from '../../../../components/PageTitle';

interface TipoDeAcc {
  id: number;
  nome: string;
  limite_de_pontos: number;
  completed: number;
  pontuacao: number;
  unidade_de_medida: {
    id: number;
    nome: string;
  };
  pontos_por_unidade: number;
}

export default function CadastrarAcc(): JSX.Element {
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

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      const file = certificado || new Blob();
      const userID = sessionStorage.getItem(USERID_KEY) || '';

      if (!file.size) {
        notifyError('Anexe um certificado!');
      }

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
        history.push('/discente/home');
      }
    } catch (err) {
      notifyError('Não foi possível cadastrar a ACC, tente novamente.');
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
      <PageTitle backTo="/discente/home">Nova Acc</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="tipo-de-acc" isRequired>
            <FormLabel>Tipo de ACC</FormLabel>
            <Select
              placeholder="Tipo de ACC"
              value={idTipoDeAcc}
              onChange={handleIdTipoDeAcc}
            >
              {tiposDeAcc.map(tipoDeAcc => (
                <option key={tipoDeAcc.id} value={tipoDeAcc.id}>
                  {tipoDeAcc.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <FormControl id="quantidade" isRequired>
            <FormLabel>
              {`Quantidade de ${
                tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
                  ?.unidade_de_medida.nome || 'Hora'
              }s`}
            </FormLabel>
            <Input
              type="quantidade"
              placeholder={`${
                tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
                  ?.unidade_de_medida.nome || 'Hora'
              }s`}
              value={quantidade}
              onChange={handleCargaHoraria}
            />
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <FormControl id="descricao" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              value={descricao}
              onChange={handleDescricao}
              placeholder="Descrição"
              rows={6}
            />
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <div style={{ width: '100%' }}>
            <label htmlFor="certificado">
              Certificado:
              <FileUploader id="certificado" handleFile={handleFile} />
            </label>
          </div>
        </Box>
        <Flex justifyContent="center">
          <Button type="submit" colorScheme="teal">
            Cadastrar
          </Button>
        </Flex>
      </form>
    </>
  );
}
