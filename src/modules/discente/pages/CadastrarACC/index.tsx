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
  name: string;
  point_limit: number;
  unity_of_measurement: {
    id: number;
    name: string;
  };
  points_per_unity: number;
  acc_variants: {
    id: number;
    description: string;
    points_per_unity: 0;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        return;
      }

      setIsSending(true);

      formData.append('description', descricao);
      formData.append('quantity', quantidade);
      formData.append('user', userID);
      formData.append('acc_type', idTipoDeAcc);
      formData.append('certificate', file);
      formData.append('acc_variant', String(accVariantId));

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
    try {
      setIsLoading(true);
      const response = await api.get('acc-types', {
        params: {
          sortField: 'name',
          sortOrder: 'ASC',
        },
      });
      setTiposDeAcc(response.data.data);
      setIsLoading(false);
    } catch (err) {
      notifyError('Não foi possível carregar os tipos de acc :(');
    }
  };

  function handleACCTypeId(e: ChangeEvent<HTMLSelectElement>) {
    setIdTipoDeAcc(e.target.value);
    setACCVariantId(
      String(
        tiposDeAcc.find(t => t.id === Number(e.target.value))?.acc_variants[0]
          .id,
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
        ?.acc_variants.find(variant => variant.id === Number(accVariantId))
        ?.points_per_unity || 0;

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
                  {tipoDeAcc.name}
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
            {tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))?.acc_variants &&
              tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))?.acc_variants
                .length !== 1 &&
              tiposDeAcc
                .find(t => t.id === Number(idTipoDeAcc))
                ?.acc_variants.map(variant => (
                  <Radio
                    key={variant.id}
                    colorScheme="teal"
                    value={String(variant.id)}
                    name="variant"
                  >
                    {variant.description}
                  </Radio>
                ))}
          </Stack>
        </RadioGroup>

        <Stack direction={['column', 'row']} spacing="2" marginBottom="3">
          <FormControl id="quantidade" isRequired>
            <FormLabel>
              {`Quantidade de ${
                tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
                  ?.unity_of_measurement.name || 'Hora'
              }s`}
            </FormLabel>
            <Input
              type="quantidade"
              placeholder={`${
                tiposDeAcc.find(t => t.id === Number(idTipoDeAcc))
                  ?.unity_of_measurement.name || 'Hora'
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
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSending}
            disabled={isLoading}
          >
            Cadastrar
          </Button>
        </Flex>
      </form>
    </>
  );
}
