import React from 'react';

import { Progress } from './Progress';
import { calcularProgresso } from '../utils/calculos';

import '../styles/Home.scss'

interface AccDetails {
  name: string,
  limit: number,
  measurementUnity: string,
  pointsPerUnity: number,
  completed: number,
}

const Card = (props: AccDetails) => {
  return (
    <div className="card">
      <div className="card-title">
        <strong>
          { props.name }
        </strong>
      </div>
      <div className="card-content">
        <ul>
          <li>Limite de pontos: <strong>{ props.limit }</strong></li>
          <li>Pontos por { props.measurementUnity }: <strong>{ props.pointsPerUnity }</strong></li>
        </ul>

        <div>Quantidade Utilizada: <strong>{ props.completed }/{ props.limit }</strong></div>
      </div>
      <Progress type="success" completed={calcularProgresso(props.limit, props.completed)} />
    </div>
  );
}

export { Card };