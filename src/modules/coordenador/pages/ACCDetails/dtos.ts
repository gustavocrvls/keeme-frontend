export interface IACCWithUser {
  id: number;
  pontos: number;
  quantidade: number;
  descricao: string;
  criado_em: Date;
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
  variante_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: number;
  };
  certificado: {
    id: number;
  };
  avaliacao_da_acc: {
    id: number;
    criado_em: Date;
    descricao: string;
    usuario: {
      id: number;
      nome: string;
    };
  };
}

export interface ParamTypes {
  id: string;
}
