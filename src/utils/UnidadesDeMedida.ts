import * as unidadesDeMedidaConsts from '../constants/unidadesDeMedida';

function tipoDeAccHandleName(id: number) {
  switch (id) {
    case unidadesDeMedidaConsts.HORA:
      return 'Horas';
    case unidadesDeMedidaConsts.EVENTO:
      return 'Eventos';
    case unidadesDeMedidaConsts.SEMESTRE:
      return 'Semestres';
    case unidadesDeMedidaConsts.VISITA:
      return 'Visitas';
    case unidadesDeMedidaConsts.PALESTRA:
      return 'Palestras';
    case unidadesDeMedidaConsts.TRABALHO:
      return 'Trabalhos';
    case unidadesDeMedidaConsts.CERTIFICADO:
      return 'Certificados';  
  }
}

export {
  tipoDeAccHandleName
}