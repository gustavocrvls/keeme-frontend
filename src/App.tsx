import React from 'react';
import Routes from './routes';

import "../node_modules/noty/lib/noty.css";  
import "noty/lib/themes/nest.css";  

import './styles/global.scss';

function App() {
  return (
    <div id="app-content">
      <Routes />
    </div>
  );
}

export default App;
