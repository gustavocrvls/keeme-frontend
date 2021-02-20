/* eslint-disable camelcase */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCircle,
  FiDownload,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import styled from 'styled-components';
import {
  Box,
  Button,
  Stack,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
} from '@chakra-ui/react';

import statusDaAccConsts from '../../../constants/statusDaAcc';
import api from '../../../services/api';
import { notifyWarning } from '../../../utils/Notifications';

interface IAcc {
  id: number;
  id_certificado: number;
  pontos: number;
  quantidade: number;
  sobre: string;
  status_da_acc: {
    id: number;
    nome: string;
  };
  tipo_de_acc: {
    id: number;
    nome: string;
    unidade_de_medida: {
      id: number;
      nome: string;
    };
  };
  usuario: {
    id: number;
    nome: string;
    curso: {
      id: number;
      nome: string;
    };
  };
}

interface IStatus {
  id: number;
  nome: string;
}

const Details = styled.div`
  margin-top: 10px;

  div {
    margin-bottom: 5px;
  }
`;

interface IState {
  acc: IAcc;
  avaliacao: string;
  modalAvaliacaoIsOpen: boolean;
}

interface IMatchParams {
  id: string;
}

type IMatchProps = RouteComponentProps<IMatchParams>;

class DetalhesDaAcc extends React.Component<IMatchProps, IState> {
  constructor(props: IMatchProps) {
    super(props);
    this.state = {
      acc: {
        id: 0,
        id_certificado: 0,
        pontos: 0,
        quantidade: 0,
        sobre: '',
        status_da_acc: {
          id: 0,
          nome: '',
        },
        tipo_de_acc: {
          id: 0,
          nome: '',
          unidade_de_medida: {
            id: 0,
            nome: '',
          },
        },
        usuario: {
          id: 0,
          nome: '',
          curso: {
            id: 0,
            nome: '',
          },
        },
      },
      avaliacao: '',
      modalAvaliacaoIsOpen: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const response = await api.get(`accs/${id}`);
    this.setState({
      acc: response.data,
    });
  }

  goBack = (): void => {
    const { history } = this.props;
    if (history) history.go(-1);
  };

  changeAccStatus = (status: number) => {
    const { avaliacao, acc } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    async function changeStatus(newStatus: number) {
      if (newStatus === statusDaAccConsts.APROVADA) {
        const response = await api.put(`accs/update/${id}/status`, {
          status_da_acc: newStatus,
        });
      }
      if (newStatus === statusDaAccConsts.NEGADA) {
        if (!avaliacao.length) {
          notifyWarning('É necessário especificar o motivo da negação');
        }
        const response = await api.post(`avaliacoes-das-accs`, {
          descricao: avaliacao,
          status_da_acc: newStatus,
          usuario: acc.usuario.id,
          acc: acc.id,
        });
      }
    }

    changeStatus(status);
  };

  handleStatusColor = (status?: IStatus): JSX.Element => {
    let color = '';
    let Icon = <></>;
    if (status)
      switch (status.id) {
        case statusDaAccConsts.EM_ANALISE:
          color = '#8FA7B2';
          Icon = <FiCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.APROVADA:
          color = '#31878C';
          Icon = <FiCheckCircle style={{ marginRight: 5 }} />;
          break;
        case statusDaAccConsts.NEGADA:
          color = '#DE4079';
          Icon = <FiXCircle style={{ marginRight: 5 }} />;
          break;

        default:
          break;
      }

    return (
      <span
        style={{
          fontSize: 12,
          backgroundColor: color,
          padding: '2px 5px',
          color: '#fff',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          width: 120,
          justifyContent: 'center',
        }}
      >
        {Icon}
        {status?.nome}
      </span>
    );
  };

  toggleModalAvaliacao = () => {
    const { modalAvaliacaoIsOpen } = this.state;
    this.setState({
      modalAvaliacaoIsOpen: !modalAvaliacaoIsOpen,
    });
  };

  render() {
    const { acc, avaliacao, modalAvaliacaoIsOpen } = this.state;

    return (
      <>
        <div className="page-title">
          <button
            type="button"
            onClick={this.goBack}
            className="btn back-button"
          >
            <FiArrowLeft style={{ strokeWidth: 2 }} />
          </button>
          <div className="title">Detalhes da Acc</div>
        </div>
        <Details>
          <div>
            <label htmlFor="discente">
              Discente
              <p id="discente">{acc?.usuario.nome}</p>
            </label>
          </div>
          <div>
            <label htmlFor="tipo">
              Tipo de Acc
              <p id="tipo">{acc?.tipo_de_acc.nome}</p>
            </label>
          </div>
          <div>
            <label htmlFor="status">
              Status
              <p id="status">{this.handleStatusColor(acc?.status_da_acc)}</p>
            </label>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>
              <label htmlFor="quantidade">
                {`${acc?.tipo_de_acc.unidade_de_medida.nome}s`}
                <p id="quantidade">{acc?.quantidade}</p>
              </label>
            </div>
            <div>
              <label htmlFor="pontuacao">
                Pontuação
                <p id="pontuacao">{acc?.pontos}</p>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="descricao">
              Descrição
              <p id="descricao">{acc?.sobre}</p>
            </label>
          </div>
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Link
              colorScheme="gray"
              className="btn"
              href={`http://localhost:3333/certificados/${acc?.id_certificado}`}
              display="flex"
            >
              <FiDownload />
              Baixar Certificado
            </Link>
            {/* <Button
              colorScheme="gray"
              size="sm"
              onClick={() => {
                api
                  .get(
                    `http://localhost:3333/certificados/${acc?.id_certificado}`,
                    {
                      responseType: 'blob',
                    },
                  )
                  .then((response: AxiosResponse) => {
                    const url = window.URL.createObjectURL(
                      new Blob([response.data]),
                    );
                    console.log(response.data.type);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'certificado');
                    document.body.appendChild(link);
                    link.click();
                  });
              }}
            >
              {acc?.id_certificado}
            </Button> */}
          </div>
          {acc.status_da_acc.id === statusDaAccConsts.EM_ANALISE && (
            <Box>
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() =>
                    // eslint-disable-next-line prettier/prettier
                    this.changeAccStatus(statusDaAccConsts.APROVADA)}
                >
                  Aprovar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={this.toggleModalAvaliacao}
                >
                  Reprovar
                </Button>
              </Stack>
            </Box>
          )}
        </Details>

        <Modal
          isOpen={modalAvaliacaoIsOpen}
          onClose={this.toggleModalAvaliacao}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Motivo da Reprovação</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="Motivo"
                value={avaliacao}
                onChange={e => this.setState({ avaliacao: e.target.value })}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={this.toggleModalAvaliacao}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  this.changeAccStatus(statusDaAccConsts.NEGADA);
                }}
              >
                Reprovar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default withRouter(DetalhesDaAcc);
