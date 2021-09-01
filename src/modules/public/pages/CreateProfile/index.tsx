import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { BaseContainer } from '../../../../components/Container/BaseContainer';
import {
  notifyError,
  notifySuccess,
} from '../../../../components/Notifications';
import PageTitle from '../../../../components/PageTitle';
import { PROFILES } from '../../../../constants/Profiles';
import { useSession } from '../../../../hooks/useSession';
import { api } from '../../../../services/api';
import { Course, FormData } from './dtos';

export function CreateProfile(): JSX.Element {
  const [courses, setCourses] = useState<Course[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { userUsername } = useSession();
  const history = useHistory();

  async function loadCourses(): Promise<void> {
    const response = await api.get('courses');

    setCourses(response.data.data);
  }

  async function handleForm(data: FormData) {
    try {
      const response = await api.post('users', {
        ...data,
        profile: PROFILES.STUDENT,
      });

      if (response.status === 201) {
        history.push('/');
        notifySuccess('Perfil criado com sucesso!');
      }
    } catch {
      notifyError('Algo deu errado... Tente novamente!');
    }
  }

  useEffect(() => {
    if (!userUsername) {
      notifyError('Você precisa fazer login para acessar a plataforma!');
      history.push('/');
    }

    loadCourses();
  }, []);

  return (
    <BaseContainer>
      <Box as="form" onSubmit={handleSubmit(handleForm)}>
        <Text as="h1" fontSize="5xl" color="teal" textAlign="center">
          KeeMe
        </Text>

        <PageTitle>Criar Perfil</PageTitle>

        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input id="name" placeholder="Nome" {...register('name')} />
          </FormControl>

          <Stack direction={['column', 'column', 'row']} spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                {...register('email')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="username">Usuário</FormLabel>
              <Input
                id="username"
                placeholder="Usuário"
                value={userUsername}
                {...register('username')}
                readOnly
              />
            </FormControl>
          </Stack>
          <Stack direction={['column', 'column', 'row']} spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="registration">Matrícula</FormLabel>
              <Input
                id="registration"
                placeholder="Matrícula"
                type="number"
                {...register('registration')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Curso:</FormLabel>
              <Select placeholder="Curso" {...register('course')}>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Flex align="center" justify="center">
            <Button type="submit" colorScheme="teal">
              Cadastrar
            </Button>
          </Flex>
        </Stack>
      </Box>
    </BaseContainer>
  );
}
