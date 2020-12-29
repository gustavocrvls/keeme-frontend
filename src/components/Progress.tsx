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

  background-color: #D3E2E5;
`;

const CompletedProgress = styled.div`
  position: absolute;
  
  height: 5px;
  border-radius: 16px;

  background-color: #31878C;
`;

interface ProgressProps {
  type: string,
  completed: number
}

const Progress = (props: ProgressProps) => {
  return (
    <ProgressBar>
      <TotalProgress />
      <CompletedProgress style={{ width: `${props.completed}%` }} />
    </ProgressBar>
  )
}

export { Progress };