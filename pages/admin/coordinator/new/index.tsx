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
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PROFILES } from '../../../../constants/Profiles';
import { api } from '../../../../services/api';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import { Course, FormData } from './dtos';
import { PageTitle } from '../../../../components/PageTitle';
import { useRouter } from 'next/router';

export function RegisterCoordinator(): JSX.Element {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef<any>({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  password.current = watch('password', '');

  const router = useRouter();

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

  useEffect(() => {
    loadCursos();
  }, []);

  async function handleForm(data: FormData): Promise<void> {
    setIsCreating(true);
    try {
      await api.post('users', {
        name: data.name,
        username: data.username,
        course: data.course,
        email: data.email,
        password: data.password,
        profile: PROFILES.COORDINATOR,
      });
      notifySuccess('Novo coordenador cadastrado!');
      router.push('/administrator/home');
    } catch (err) {
      notifyError('Não foi possível cadastrar o coordenador :(');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div>
      <PageTitle>Cadastrar Coordenador</PageTitle>

      <Box as="form" onSubmit={handleSubmit(handleForm)}>
        <Box marginBottom="3">
          <FormControl id="name" isRequired>
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
          <FormControl id="course" isRequired>
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
          <SimpleGrid columns={2} spacing={2}>
            <FormControl id="password" isRequired isInvalid={errors.password}>
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

            <FormControl id="password2" isRequired isInvalid={errors.password2}>
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
                <FormErrorMessage>{errors.password2.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Mínimo de 8 caracteres</FormHelperText>
              )}
            </FormControl>
          </SimpleGrid>
        </Box>
        <Flex justifyContent="center">
          <Button
            type="submit"
            isLoading={isCreating || isLoading}
            colorScheme="teal"
          >
            Cadastrar
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
