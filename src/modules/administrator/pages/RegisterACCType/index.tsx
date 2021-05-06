import { FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import { api } from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { IACCVariant, IUnityOfMeasurement } from './dtos';
import PageTitle from '../../../../components/PageTitle';

export function RegisterACCType(): JSX.Element {
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState<
    IUnityOfMeasurement[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [unityOfMeasurement, setUnityOfMeasurement] = useState('');
  const [description, setDescription] = useState('');
  const [pointLimit, setPointLimit] = useState(0);
  const [accVariants, setACCVariants] = useState<IACCVariant[]>([
    {
      id: new Date().getTime(),
      points_per_unity: 0,
    },
  ]);

  const [hasVariants, setHasVariants] = useState(false);

  const history = useHistory();

  async function loadData() {
    try {
      setIsLoading(true);

      const response = await api.get('units-of-measurement');

      setUnitsOfMeasurement(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar os dados :(');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForm(e: FormEvent) {
    e.preventDefault();

    let variants = [];

    if (accVariants.length === 1)
      variants.push({ points_per_unity: accVariants[0].points_per_unity });
    if (accVariants.length > 1) {
      variants = accVariants.filter(
        accV => accV.description && accV.description?.length > 0,
      );
      variants = variants.map(v => ({
        points_per_unity: v.points_per_unity,
        description: v.description,
      }));
    }

    try {
      setIsLoading(true);
      await api.post('acc-types', {
        name,
        point_limit: pointLimit,
        description,
        unity_of_measurement: unityOfMeasurement,
        acc_variants: variants,
      });

      notifySuccess('Novo Tipo de ACC cadastrado!');

      history.push('/administrator/acc-types');
    } catch (err) {
      notifyError('Não foi possível cadastrar o Tipo de ACC :(');
    } finally {
      setIsLoading(false);
    }
  }

  function handlePointsPerUnity(value: number) {
    const accVariantsState = accVariants;

    accVariantsState[0].points_per_unity = value;

    setACCVariants([...accVariantsState]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <PageTitle>Cadastrar Tipo de ACC</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="nome" isRequired>
            <FormLabel>Nome da atividade</FormLabel>
            <Input
              type="name"
              placeholder="Nome da atividade"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box marginBottom="3">
          <SimpleGrid columns={[1, 3]} spacing={2}>
            <GridItem>
              <FormControl id="limite" isRequired>
                <FormLabel>Limite de pontos</FormLabel>
                <NumberInput
                  value={pointLimit}
                  onChange={value => setPointLimit(Number(value))}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl id="unityOfMeasurement" isRequired>
                <FormLabel>Unidade de medida</FormLabel>
                <Select
                  placeholder="Escolha uma unidade"
                  value={Number(unityOfMeasurement)}
                  onChange={e => setUnityOfMeasurement(e.target.value)}
                >
                  {unitsOfMeasurement.map(unity => (
                    <option key={unity.id} value={unity.id}>
                      {unity.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              {unityOfMeasurement && !hasVariants && (
                <FormControl id="pontosPorUnidade" isRequired>
                  <FormLabel>
                    {`Pontos por ${
                      unitsOfMeasurement
                        .find(u => u.id === Number(unityOfMeasurement))
                        ?.name.toLowerCase() || 'hora'
                    }`}
                  </FormLabel>

                  <NumberInput
                    value={accVariants[0].points_per_unity}
                    onChange={value => handlePointsPerUnity(Number(value))}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Possui variações
            </FormLabel>
            <Switch
              id="email-alerts"
              colorScheme="teal"
              checked={hasVariants}
              onChange={e => setHasVariants(e.target.checked)}
            />
          </FormControl>
        </Box>
        {hasVariants && (
          <Box marginBottom="3">
            {accVariants.map((accVariant, index) => (
              <Stack
                key={accVariant.id}
                direction="row"
                spacing="3"
                width="100%"
                alignItems="flex-end"
                marginBottom="3"
              >
                <Box width="100%">
                  <FormControl
                    id={`variant-description-${index}`}
                    width="100%"
                    isRequired
                  >
                    {!index && <FormLabel>Descrição</FormLabel>}
                    <Input
                      type="text"
                      placeholder="Descrição"
                      value={accVariant.description || ''}
                      onChange={value => {
                        setACCVariants(
                          accVariants.map((accV, i) => {
                            if (i === index)
                              return {
                                ...accV,
                                description: String(value.target.value),
                              };
                            return accV;
                          }),
                        );
                      }}
                    />
                  </FormControl>
                </Box>
                <Box width="100%">
                  <FormControl id="variant-points-per-unity" isRequired>
                    {!index && (
                      <FormLabel>
                        {`Pontos por ${
                          unitsOfMeasurement
                            .find(u => u.id === Number(unityOfMeasurement))
                            ?.name.toLowerCase() || 'hora'
                        }`}
                      </FormLabel>
                    )}
                    <NumberInput
                      value={accVariant.points_per_unity}
                      onChange={value => {
                        setACCVariants(
                          accVariants.map((accV, i) => {
                            if (i === index)
                              return {
                                ...accV,
                                points_per_unity: Number(value),
                              };
                            return accV;
                          }),
                        );
                      }}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  {(index === accVariants.length - 1 && (
                    <Tooltip label="Adicionar mais uma variante" hasArrow>
                      <IconButton
                        aria-label="add variant"
                        icon={<FiPlusCircle />}
                        colorScheme="teal"
                        isDisabled={
                          !accVariant.description ||
                          !accVariant.points_per_unity
                        }
                        onClick={() => {
                          const accVariantsState = [...accVariants];
                          accVariantsState.push({
                            id: new Date().getTime(),
                            points_per_unity: 0,
                          });
                          setACCVariants(accVariantsState);
                        }}
                      />
                    </Tooltip>
                  )) || (
                    <Tooltip label="Excluir variante" hasArrow>
                      <IconButton
                        aria-label="add variant"
                        icon={<FiTrash />}
                        colorScheme="red"
                        onClick={() => {
                          setACCVariants(
                            accVariants.filter((accV, i) => i !== index),
                          );
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Stack>
            ))}
          </Box>
        )}
        <Box marginBottom="3">
          <FormControl id="descricao" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição"
              rows={6}
            />
          </FormControl>
        </Box>
        <Flex justifyContent="center">
          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            loadingText="Cadastrando"
            colorScheme="teal"
          >
            Cadastrar
          </Button>
        </Flex>
      </form>
    </div>
  );
}
