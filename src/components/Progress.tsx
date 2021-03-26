import React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: relative;
  padding-top: 10px;
`;

const TotalProgress = styled.div`
  position: absolute;

  height: 5px;
  width: 100%;
  border-radius: 16px;

  background-color: #d3e2e5;
`;

const CompletedProgress = styled.div`
  position: absolute;

  height: 5px;
  border-radius: 16px;

  background-color: #31878c;
`;

interface ProgressProps {
  completed: number;
}

const Progress = (props: ProgressProps): JSX.Element => {
  const { completed } = props;

  return (
    <ProgressBar>
      <TotalProgress />
      <CompletedProgress
        style={
          completed === 100
            ? { width: `${completed}%`, backgroundColor: '#31878c' }
            : { width: `${completed}%` }
        }
      />
    </ProgressBar>
  );
};

export { Progress };
