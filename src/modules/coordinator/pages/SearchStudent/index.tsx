/* eslint-disable jsx-a11y/label-has-associated-control */
import { Flex, IconButton, Input, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { api } from '../../../../services/api';
import { notifyError } from '../../../../components/Notifications';
import { PageTitle } from '../../../../components/PageTitle';
import { Student } from './dto';
import { SearchStudentsList } from './components/SearchStudentsList';
import { USER_COURSE_KEY } from '../../../../services/auth';
import { PROFILES } from '../../../../constants/Profiles';

export function SearchStudent(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState<number>(0);

  async function handleSearch(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (search === '') {
      setStudents([]);
    } else {
      try {
        setIsLoading(true);
        setIsSearched(true);
        const response = await api.get('users', {
          params: {
            search,
            course: sessionStorage.getItem(USER_COURSE_KEY),
            profile: PROFILES.STUDENT,
            sortField: 'name',
          },
        });

        setStudents(response.data.data);
      } catch (err) {
        notifyError('Ops, algo deu errado! Tente novamente!');
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    setIsSearched(false);
  }, [search]);

  return (
    <div>
      <PageTitle>Pesquisar Discente</PageTitle>

      <form onSubmit={handleSearch} style={{ width: '100%' }}>
        <Flex width="100%" marginBottom="5">
          <Input
            value={search}
            id="student-name"
            placeholder="Nome ou Matrícula do Discente"
            onChange={e => setSearch(e.target.value)}
            width="100%"
            marginRight="2"
          />
          <Tooltip label="Buscar" hasArrow>
            <IconButton
              colorScheme="teal"
              type="submit"
              aria-label="Search Icon"
              icon={<FiSearch size={20} />}
              isLoading={isLoading}
            />
          </Tooltip>
        </Flex>
      </form>

      {search.length > 0 && isSearched && !isLoading && !students.length && (
        <Text fontSize="sm" color="gray.600">
          Não foram encontrados discentes com essa Matrícula ou Nome
        </Text>
      )}

      {!search.length && !students.length && (
        <Text fontSize="sm" color="gray.600">
          Escreva algum Nome ou Matrícula para buscar
        </Text>
      )}

      <SearchStudentsList students={students} isLoading={isLoading} />
    </div>
  );
}
