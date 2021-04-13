import { FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { IACCVariant, IUnityOfMeasurement } from './dtos';
import PageTitle from '../../../../components/PageTitle';

export function RegisterACCType() {
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState<
    IUnityOfMeasurement[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [unityOfMeasurement, setUnityOfMeasurement] = useState('');
  const [description, setDescription] = useState('');
  const [pointLimit, setPointLimit] = useState('');
  const [accVariants, setACCVariants] = useState<IACCVariant>(
    {} as IACCVariant,
  );

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
    try {
      setIsLoading(true);
      await api.post('acc-types', {
        name,
        point_limit: pointLimit,
        description,
        unity_of_measurement: unityOfMeasurement,
        acc_variants: accVariants,
      });

      notifySuccess('Novo Tipo de ACC cadastrado!');

      history.push('/administrator/acc-types');
    } catch (err) {
      notifyError('Não foi possível cadastrar o Tipo de ACC :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <PageTitle>Cadastrar Tipo de ACC</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="nome">
            <FormLabel>Nome da Atividade</FormLabel>
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
              <FormControl id="limite">
                <FormLabel>Limite de Pontos</FormLabel>
                <Input
                  type="number"
                  placeholder="Limite da pontos"
                  value={pointLimit}
                  onChange={e => setPointLimit(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl id="unityOfMeasurement">
                <FormLabel>Unidade De Medida</FormLabel>
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
              {/* <FormControl id="pontosPorUnidade">
                <FormLabel>
                  {`Pontos por ${
                    unitsOfMeasurement.find(
                      u => u.id === Number(unityOfMeasurement),
                    )?.name || 'Hora'
                  }`}
                </FormLabel>
                <Input
                  type="number"
                  placeholder={`Pontos por ${
                    unitsOfMeasurement.find(
                      u => u.id === Number(unityOfMeasurement),
                    )?.name || 'Hora'
                  }`}
                  value={point}
                  onChange={e => {
                    this.setState({
                      pontosPorUnidade: e.target.value,
                    });
                  }}
                />
              </FormControl> */}
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl id="descricao">
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
