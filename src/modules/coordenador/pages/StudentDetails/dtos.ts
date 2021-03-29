export interface IStudent {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  username: string;
  curso: {
    id: number;
    nome: string;
  };
}

export interface IACC {
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
  variante_de_acc: {
    id: number;
    descricao: string;
    pontos_por_unidade: number;
  };
}

export interface ISummary {
  approved_points: number;
  under_analysis: number;
  failed_points: number;
}

export interface ParamTypes {
  id: string;
}
