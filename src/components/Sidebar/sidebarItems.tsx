import { FiFile, FiHome, FiPackage, FiPlus, FiSearch } from 'react-icons/fi';
import PERFIS from '../../constants/Perfis';

export const SidebarItems = {
  [PERFIS.ADMIN]: {
    items: [
      {
        label: 'Coordenadores',
        to: '/administrador/home',
        icon: FiHome,
      },
      {
        label: 'Tipos de ACC',
        to: '/administrador/tipos-de-acc',
        icon: FiPackage,
      },
    ],
  },
  [PERFIS.COORDENADOR]: {
    items: [
      {
        label: 'ACCs Recebidas',
        to: '/coordenador/home',
        icon: FiHome,
      },
      {
        label: 'Pesquisar Discente',
        to: '/coordenador/pesquisar-discente',
        icon: FiSearch,
      },
    ],
  },
  [PERFIS.DISCENTE]: {
    items: [
      {
        label: 'Início',
        to: '/discente/home',
        icon: FiHome,
      },
      {
        label: 'Cadastrar ACC',
        to: '/discente/cadastrar-acc',
        icon: FiPlus,
      },
      {
        label: 'Minhas ACCs',
        to: '/discente/minhas-accs',
        icon: FiFile,
      },
      {
        label: 'Tipos de ACC',
        to: '/discente/tipos-de-acc',
        icon: FiPackage,
      },
    ],
  },
};
