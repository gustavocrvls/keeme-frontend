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
  RadioGroup,
  Stack,
  Radio,
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
  variantes_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: 0;
  }[];
}

export default function CadastrarAcc(): JSX.Element {
  const [tiposDeAcc, setTiposDeAcc] = useState(new Array<TipoDeAcc>());
  const [idTipoDeAcc, setIdTipoDeAcc] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [certificado, setCertificado] = useState<Blob>();
  const [accVariantId, setACCVariantId] = useState<string | number>();
  const [points, setPoints] = useState<number>();
  const [isSending, setIsSending] = useState<boolean>(false);

  const history = useHistory();

  const handleFile = (files: Blob) => {
    setCertificado(files);
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

      setIsSending(true);

      formData.append('descricao', descricao);
      formData.append('quantidade', quantidade);
      formData.append('idUsuario', userID);
      formData.append('tipoDeAcc', idTipoDeAcc);
      formData.append('certificado', file);
      formData.append('variante_de_acc', String(accVariantId));

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
    const response = await api.get('tipos-de-acc', {
      params: {
        sortField: 'nome',
        sortOrder: 'ASC',
      },
    });
    setTiposDeAcc(response.data.data);
  };

  function handleACCTypeId(e: ChangeEvent<HTMLSelectElement>) {
    setIdTipoDeAcc(e.target.value);
    setACCVariantId(
      String(
        tiposDeAcc.find(t => t.id === Number(e.target.value))
          ?.variantes_de_acc[0].id,
      ),
    );
  }

  useEffect(() => {
    loadTiposDeAcc();
  }, []);

  useEffect(() => {
    const pt =
      tiposDeAcc
        .find(t => t.id === Number(idTipoDeAcc))
        ?.variantes_de_acc.find(variant => variant.id === Number(accVariantId))
        ?.pontos_por_unidade || 0;

    setPoints(pt * Number(quantidade));
  }, [accVariantId, quantidade]);

  return (
    <>
      <PageTitle>Cadastrar ACC</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="tipo-de-acc" isRequired>
            <FormLabel>Tipo de ACC</FormLabel>
            <Select
              placeholder="Tipo de ACC"
              value={idTipoDeAcc}
              onChange={handleACCTypeId}
            >
              {tiposDeAcc.map(tipoDeAcc => (
                <option key={tipoDeAcc.id} value={tipoDeAcc.id}>
                  {tipoDeAcc.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <RadioGroup
          marginTop="3"
          marginBottom="3"
          onChange={setACCVariantId}
          value={accVariantId}
        >
          <Stack>
            {tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
              ?.variantes_de_acc &&
              tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
                ?.variantes_de_acc.length !== 1 &&
              tiposDeAcc
                .find(t => t.id === Number(idTipoDeAcc))
                ?.variantes_de_acc.map(variant => (
                  <Radio
                    key={variant.id}
                    colorScheme="teal"
                    value={String(variant.id)}
                    name="variant"
                  >
                    {variant.descricao}
                  </Radio>
                ))}
          </Stack>
        </RadioGroup>

        <Stack direction={['column', 'row']} spacing="2" marginBottom="3">
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
              onChange={e => setQuantidade(e.target.value)}
            />
          </FormControl>
          <FormControl
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <FormLabel>Pontos:</FormLabel>
            <Box marginBottom="2">
              <strong>{points}</strong>
            </Box>
          </FormControl>
        </Stack>

        <Box marginBottom="3">
          <FormControl id="descricao" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição"
              rows={6}
            />
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <div style={{ width: '100%' }}>
            <label htmlFor="certificado">
              <Flex justifyContent="space-between">
                <Box>
                  Certificado:
                  <span
                    style={{
                      marginLeft: '0.25rem',
                      color: '#E53E3E',
                    }}
                  >
                    *
                  </span>
                </Box>
                <Box color="gray.400" fontSize="sm">
                  (Tipos suportados: jpeg, jpg, png e pdf)
                </Box>
              </Flex>
              <FileUploader id="certificado" handleFile={handleFile} />
            </label>
          </div>
        </Box>
        <Flex justifyContent="center">
          <Button type="submit" colorScheme="teal" isLoading={isSending}>
            Cadastrar
          </Button>
        </Flex>
      </form>
    </>
  );
}
