import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding-top: 65px;

  box-sizing: border-box;
`;

const Container = (props: any): JSX.Element => {
  const { children } = props;
  return (
    <BaseContainer>
      <div style={{ margin: '0 10px' }}>{children}</div>
    </BaseContainer>
  );
};

export { Container };
