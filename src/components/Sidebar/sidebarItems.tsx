import { FiFile, FiHome, FiPackage, FiPlus, FiSearch } from 'react-icons/fi';
import PERFIS from '../../constants/Perfis';

export const SidebarItems = {
  [PERFIS.ADMIN]: {
    items: [
      {
        label: 'Início',
        to: '/administrator/home',
        icon: FiHome,
      },
      {
        label: 'Cadastrar Coordenador',
        to: '/administrator/coordinator/new',
        icon: FiPlus,
      },
      {
        label: 'Tipos de ACC',
        to: '/administrator/acc-types',
        icon: FiPackage,
      },
    ],
  },
  [PERFIS.COORDENADOR]: {
    items: [
      {
        label: 'Início',
        to: '/coordinator/home',
        icon: FiHome,
      },
      {
        label: 'Pesquisar Discente',
        to: '/coordinator/search-student/',
        icon: FiSearch,
      },
    ],
  },
  [PERFIS.DISCENTE]: {
    items: [
      {
        label: 'Início',
        to: '/student/home',
        icon: FiHome,
      },
      {
        label: 'Cadastrar ACC',
        to: '/student/cadastrar-acc',
        icon: FiPlus,
      },
      {
        label: 'Minhas ACCs',
        to: '/student/minhas-accs',
        icon: FiFile,
      },
      {
        label: 'Tipos de ACC',
        to: '/student/tipos-de-acc',
        icon: FiPackage,
      },
    ],
  },
};
