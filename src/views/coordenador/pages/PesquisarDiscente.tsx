/* eslint-disable jsx-a11y/label-has-associated-control */
import { Flex, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { notifyError } from '../../../components/Notifications';
import PageTitle from '../../../components/PageTitle';

interface IUsuario {
  id: number;
  name: string;
  username: string;
  course: {
    id: number;
    name: string;
  };
}

export default function PesquisarDiscente(): JSX.Element {
  const [students, setDiscentes] = useState<Array<IUsuario>>([]);
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function search(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (nome === '') {
      setDiscentes([]);
    } else {
      try {
        setIsLoading(true);
        const response = await api.get('users', {
          params: {
            nome,
          },
        });

        setDiscentes(response.data.data);
      } catch (err) {
        notifyError('Ops, algo deu errado! Tente novamente!');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <PageTitle>Pesquisar Discente</PageTitle>

      <form onSubmit={search} style={{ width: '100%' }}>
        <Flex width="100%" marginBottom="5">
          <Input
            value={nome}
            id="nome-do-discente"
            placeholder="Nome do Discente"
            onChange={e => setNome(e.target.value)}
            width="100%"
            marginRight="2"
          />
          <IconButton
            colorScheme="teal"
            type="submit"
            aria-label="Search Icon"
            icon={<FiSearch size={20} />}
            isLoading={isLoading}
          />
        </Flex>
      </form>

      <div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map(student => (
            <Link to={`/coordenador/detalhes-do-discente/${student.id}`}>
              <li>
                <div
                  style={{
                    fontSize: '.9rem',
                    backgroundColor: '#fff',
                    boxShadow: '2px 2px 5px #dddddd',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,

                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>{student.name}</div>
                  <div>{student.course.name}</div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
