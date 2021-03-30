import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { SidebarContext } from '../contexts/SidebarProvider';

const BaseContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 10px;

  box-sizing: border-box;
`;

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  const { isSidebarAwaysShowed } = useContext(SidebarContext);

  return (
    <div style={isSidebarAwaysShowed ? { marginLeft: 250 } : {}}>
      <BaseContainer>
        <div style={{ margin: '0 10px' }}>{children}</div>
      </BaseContainer>
    </div>
  );
};

interface ILimitedContainer {
  children: ReactNode;
}

const LimitedContainer = (props: ILimitedContainer): JSX.Element => {
  const { children } = props;
  return (
    <BaseContainer>
      <div style={{ margin: '0 10px' }}>{children}</div>
    </BaseContainer>
  );
};

export { Container, LimitedContainer };
