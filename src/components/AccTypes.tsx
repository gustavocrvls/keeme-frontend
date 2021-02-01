import React from 'react';

import { Progress } from './Progress';
import { calcularProgresso } from '../utils/calculos';

import '../styles/Home.scss';

interface AccDetails {
  name: string;
  limit: number;
  measurementUnity: string;
  pointsPerUnity: number;
  completed: number;
}

const Card = (props: AccDetails): JSX.Element => {
  const { name, limit, measurementUnity, pointsPerUnity, completed } = props;
  return (
    <div className="card">
      <div className="card-title">
        <strong>{name}</strong>
      </div>
      <div className="card-content">
        <ul>
          <li>
            Limite de pontos:
            <strong>{limit}</strong>
          </li>
          <li>
            Pontos por
            {measurementUnity}
            <strong>{pointsPerUnity}</strong>
          </li>
        </ul>

        <div>
          Quantidade Utilizada:
          <strong>{`${completed}/${limit}`}</strong>
        </div>
      </div>
      <Progress
        // type="success"
        completed={calcularProgresso(limit, completed)}
      />
    </div>
  );
};

export { Card };
