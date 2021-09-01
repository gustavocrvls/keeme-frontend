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
import { api } from '../../../../services/api';
import { FileUploader } from '../../../../components/FileUploader';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { TOKEN_KEY, USERID_KEY } from '../../../../services/auth';
import { PageTitle } from '../../../../components/PageTitle';
import { ACCType } from './dtos';

export function NewAcc(): JSX.Element {
  const [accTypes, setACCTypes] = useState(new Array<ACCType>());
  const [accVariantId, setACCVariantId] = useState<string | number>();
  const [accTypeId, setACCTypeId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [certificate, setCertificate] = useState<Blob>();
  const [points, setPoints] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const history = useHistory();

  const handleFile = (files: Blob) => {
    setCertificate(files);
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      const file = certificate || new Blob();
      const userID = sessionStorage.getItem(USERID_KEY) || '';

      if (!file.size) {
        notifyError('Anexe um certificate!');
        return;
      }

      setIsSending(true);

      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('user', userID);
      formData.append('acc_type', accTypeId);
      formData.append('certificate', file);
      formData.append('acc_variant', String(accVariantId));

      const response = await api.post('accs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (response.status === 201) {
        notifySuccess('ACC cadastrada com sucesso!');
        history.push('/student/home');
      }
    } catch (err) {
      notifyError('Não foi possível cadastrar a ACC, tente novamente.');
    }
  };

  const loadACCTypes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('acc-types', {
        params: {
          sortField: 'name',
          sortOrder: 'ASC',
        },
      });
      setACCTypes(response.data.data);
      setIsLoading(false);
    } catch (err) {
      notifyError('Não foi possível carregar os tipos de acc :(');
    }
  };

  function handleACCTypeId(e: ChangeEvent<HTMLSelectElement>) {
    setACCTypeId(e.target.value);
    setACCVariantId(
      String(
        accTypes.find(t => t.id === Number(e.target.value))?.acc_variants[0].id,
      ),
    );
  }

  useEffect(() => {
    loadACCTypes();
  }, []);

  useEffect(() => {
    const pt =
      accTypes
        .find(t => t.id === Number(accTypeId))
        ?.acc_variants.find(variant => variant.id === Number(accVariantId))
        ?.points_per_unity || 0;

    setPoints(pt * Number(quantity));
  }, [accVariantId, quantity]);

  return (
    <>
      <PageTitle>Cadastrar ACC</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="tipo-de-acc" isRequired>
            <FormLabel>Tipo de ACC</FormLabel>
            <Select
              placeholder="Tipo de ACC"
              value={accTypeId}
              onChange={handleACCTypeId}
            >
              {accTypes.map(tipoDeAcc => (
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
            {accTypes.find(t => t.id === Number(accTypeId))?.acc_variants &&
              accTypes.find(t => t.id === Number(accTypeId))?.acc_variants
                .length !== 1 &&
              accTypes
                .find(t => t.id === Number(accTypeId))
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
          <FormControl id="quantity" isRequired>
            <FormLabel>
              {`Quantidade de ${
                accTypes.find(t => t.id === Number(accTypeId))
                  ?.unity_of_measurement.name || 'Hora'
              }s`}
            </FormLabel>
            <Input
              type="number"
              placeholder={`${
                accTypes.find(t => t.id === Number(accTypeId))
                  ?.unity_of_measurement.name || 'Hora'
              }s`}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
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
          <FormControl id="description" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição"
              rows={6}
            />
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <FileUploader
            label="Certificado:"
            handleFile={handleFile}
            isRequired
          />
        </Box>
        <Flex justifyContent="center">
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSending}
            disabled={isLoading || isSending}
          >
            Cadastrar
          </Button>
        </Flex>
      </form>
    </>
  );
}
