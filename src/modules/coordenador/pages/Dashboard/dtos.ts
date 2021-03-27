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
  usuario: {
    curso: {
      id: number;
      nome: string;
    };
    id: number;
    nome: string;
  };
}
