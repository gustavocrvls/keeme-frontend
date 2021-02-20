import { Heading } from '@chakra-ui/react';
import React from 'react';
import api from '../../../services/api';

interface IProps {}
interface IState {
  coordenadores: Array<any>;
}

class Dashboard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      coordenadores: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.get('usuarios');
  }

  render() {
    const { coordenadores } = this.state;

    console.log(coordenadores);

    return (
      <div>
        <Heading as="h1">Dashboard</Heading>
      </div>
    );
  }
}

export default Dashboard;
