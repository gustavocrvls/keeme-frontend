import React from 'react';

import { Progress } from '../../components/Progress';
import { Card as CardTipoDeAcc } from '../../components/AccTypes';

import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/Home.scss'

export default class Home extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="page-title">
          <button className="btn back-button"><FiArrowLeft style={{ strokeWidth: 2 }}/></button>
          <div className="title">
            Tipos de ACC
          </div>
        </div>

          <ul className="card-list">
            <li>
              <CardTipoDeAcc
                name="Participação em Simpósios e
                Congressos (nas áreas dos
                cursos da Faceel) –
                Internacionais/Nacionais"
                limit={24}
                completed={5}
                measurementUnity={'hora'}
                pointsPerUnity={0.5}
              />
            </li>
          </ul>

      </div>
    )
  }
}