import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Switch,
} from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PROFILES } from '../../../../constants/Profiles';
import api from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { ICourse, IUser, ParamTypes } from './dtos';
import PageTitle from '../../../../components/PageTitle';
import { cpfMask } from '../../../../utils/masks';
import { isValidCPF } from '../../../../utils/validations';

export function EditCoordinator(): JSX.Element {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [course, setCourse] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewPassword, setHasNewPassword] = useState(false);

  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  async function loadCursos(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get('courses', {
        params: {
          sortField: 'name',
        },
      });
      setCourses(response.data.data);
    } catch (err) {
      notifyError('Não foi possível carregar os cursos :(');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadData(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get(`users/${id}`);

      setName(response.data.name);
      setCPF(response.data.cpf);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setCourse(response.data.course.id);
    } catch (err) {
      notifyError('Não foi possível carregar os cursos :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCursos();
    loadData();
  }, []);

  async function handleForm(e: FormEvent): Promise<void> {
    e.preventDefault();

    if (!isValidCPF(cpf.replace(/\D/g, ''))) {
      notifyError('CPF inválido!');
      return;
    }

    if (hasNewPassword && password.length < 8) {
      notifyError('A senha deve ter mais de 8 caracteres!');
      return;
    }

    if (hasNewPassword && password !== password2) {
      notifyError('As senhas não estão iguais!');
      return;
    }

    setIsCreating(true);

    const data = {
      name,
      cpf: cpf.replace(/\D/g, ''),
      email,
      username,
      profile: PROFILES.COORDINATOR,
      course: Number(course),
    } as IUser;

    if (hasNewPassword) {
      data.password = password;
    }

    try {
      await api.put(`users/${id}`, data);
      notifySuccess('Usuário atualizado!');
      history.push('/administrator/home');
    } catch (err) {
      notifyError('Não foi possível atualizar o usuário :(');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div>
      <PageTitle>Editar Coordenador</PageTitle>

      <form onSubmit={handleForm}>
        <Box marginBottom="3">
          <FormControl id="nome" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormControl id="cpf" isRequired>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                placeholder="CPF"
                value={cpfMask(cpf)}
                onChange={e => setCPF(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="usuario" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl id="curso" isRequired>
            <FormLabel>Curso</FormLabel>
            <Select
              placeholder="Curso"
              value={course}
              onChange={e => setCourse(e.target.value)}
            >
              {courses.map(curso => (
                <option key={curso.id} value={curso.id}>
                  {curso.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginBottom="3">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Alterar senha
            </FormLabel>
            <Switch
              id="email-alerts"
              colorScheme="teal"
              checked={hasNewPassword}
              onChange={e => setHasNewPassword(e.target.checked)}
            />
          </FormControl>
        </Box>
        {hasNewPassword && (
          <Box marginBottom="3">
            <SimpleGrid columns={2} spacing={2}>
              <FormControl id="senha" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nome"
                />
                <FormHelperText>Mínimo de 8 caracteres</FormHelperText>
              </FormControl>

              <FormControl id="senha2" isRequired>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Nome"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
              </FormControl>
            </SimpleGrid>
          </Box>
        )}
        <Flex justifyContent="center">
          <Button
            type="submit"
            isLoading={isCreating || isLoading}
            colorScheme="teal"
          >
            Confirmar edição
          </Button>
        </Flex>
      </form>
    </div>
  );
}
