/* eslint-disable jsx-a11y/label-has-associated-control */
import { Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';
import api from '../../../services/api';
import { notifyError } from '../../../components/Notifications';

interface IUsuario {
  id: number;
  nome: string;
  username: string;
  curso: {
    id: number;
    nome: string;
  };
}

export default function PesquisarDiscente(): JSX.Element {
  const [discentes, setDiscentes] = useState<Array<IUsuario>>([]);
  const [nome, setNome] = useState('');

  async function search(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (nome === '') {
      setDiscentes([]);
    } else {
      try {
        const response = await api.get('usuarios', {
          params: {
            nome,
          },
        });

        setDiscentes(response.data);
      } catch (err) {
        notifyError('Ops, algo deu errado! Tente novamente!');
      }
    }
  }

  return (
    <div>
      <Heading as="h1" size="lg" marginBottom="5">
        Pesquisar Discente
      </Heading>

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
          />
        </Flex>
      </form>

      <div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {discentes.map(discente => (
            <Link to={`/coordenador/detalhes-do-discente/${discente.id}`}>
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
                  <div>{discente.nome}</div>
                  <div>{discente.curso.nome}</div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
