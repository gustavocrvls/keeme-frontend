/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Inputs';
import api from '../../../services/api';
import { notifyError } from '../../../utils/Notifications';

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
      <h1>Pesquisar Discente</h1>

      <div
        style={{
          display: 'flex',
        }}
      >
        <form onSubmit={search} style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Input
              value={nome}
              id="nome-do-discente"
              placeholder="Nome do Discente"
              onChange={e => setNome(e.target.value)}
              style={{
                width: '100%',
              }}
            />
            <Button
              color="primary"
              type="submit"
              style={{
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiSearch size={20} />
            </Button>
          </div>
        </form>
      </div>

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
