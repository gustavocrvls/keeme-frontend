import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Switch,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PROFILES } from '../../../../constants/Profiles';
import { api } from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { Course, ParamTypes, FormData } from './dtos';
import { PageTitle } from '../../../../components/PageTitle';

export function EditCoordinator(): JSX.Element {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewPassword, setHasNewPassword] = useState(false);
  const password = useRef<any>({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  password.current = watch('password', '');

  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  async function loadCourses(): Promise<void> {
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

      setValue('name', response.data.name);
      setValue('email', response.data.email);
      setValue('username', response.data.username);
      setValue('course', response.data.course.id);
    } catch (err) {
      notifyError('Não foi possível carregar os cursos :(');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
    loadData();
  }, []);

  async function handleForm(data: FormData): Promise<void> {
    setIsCreating(true);

    let user = {
      ...data,
      profile: PROFILES.COORDINATOR,
    };

    if (hasNewPassword) {
      user = {
        ...user,
        password: data.password,
      };
    }

    try {
      await api.put(`users/${id}`, user);
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

      <Box as="form" onSubmit={handleSubmit(handleForm)}>
        <Box marginBottom="3">
          <FormControl id="nome" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input type="text" placeholder="Nome" {...register('name')} />
          </FormControl>
        </Box>
        <Box marginBottom="3">
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input type="email" placeholder="E-mail" {...register('email')} />
            </FormControl>

            <FormControl id="usuario" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                placeholder="Usuário"
                {...register('username')}
              />
            </FormControl>
          </SimpleGrid>
        </Box>
        <Box marginBottom="3">
          <FormControl id="curso" isRequired>
            <FormLabel>Curso</FormLabel>
            <Select placeholder="Curso" {...register('course')}>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
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
                  placeholder="Senha"
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 8,
                      message: 'Mínimo de 8 caracteres',
                    },
                  })}
                />
                {errors.password ? (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                ) : (
                  <FormHelperText>Mínimo de 8 caracteres</FormHelperText>
                )}
              </FormControl>

              <FormControl id="senha2" isRequired>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...register('password2', {
                    validate: value =>
                      value === password.current ||
                      'As senhas precisam ser iguais',
                  })}
                />
                {errors.password2 ? (
                  <FormErrorMessage>
                    {errors.password2.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>Mínimo de 8 caracteres</FormHelperText>
                )}
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
      </Box>
    </div>
  );
}
