import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const BaseContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 10px;

  box-sizing: border-box;
`;

const Container = (props: any): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
  }, []);

  const { children } = props;
  return (
    <div style={windowWidth > 750 ? { marginLeft: 250 } : {}}>
      <BaseContainer>
        {windowWidth > 750 && <Sidebar />}
        <div style={{ margin: '0 10px' }}>{children}</div>
      </BaseContainer>
    </div>
  );
};

interface ILimitedContainer {
  children: JSX.Element;
  linkBack: string;
  title: string;
}

const LimitedContainer = (props: ILimitedContainer): JSX.Element => {
  const { children, linkBack, title } = props;
  return (
    <BaseContainer>
      <div style={{ margin: '0 10px' }}>{children}</div>
    </BaseContainer>
  );
};

export { Container, LimitedContainer };
