import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render () {
    return (
      <div className="container">
        <h2>Minha Pontuação</h2>

        <div>
          <Link to="/discente/tipos-de-acc" className="btn btn-success">Tipos de ACC</Link>
        </div>
      </div>
    );
  }
}