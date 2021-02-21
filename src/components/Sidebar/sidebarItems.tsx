import { FiFile, FiHome, FiPackage, FiPlus, FiSearch } from 'react-icons/fi';
import ConstPerfis from '../../constants/ConstPerfis';

const SidebarItems = {
  [ConstPerfis.ADMIN]: {
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
  [ConstPerfis.COORDENADOR]: {
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
  [ConstPerfis.DISCENTE]: {
    items: [
      {
        label: 'Início',
        to: '/discente/home',
        icon: FiHome,
      },
      {
        label: 'Nova ACC',
        to: '/discente/cadastrar-acc',
        icon: FiPlus,
      },
      {
        label: 'Minhas ACCs',
        to: '/discente/detalhes-da-pontuacao',
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

export default SidebarItems;
