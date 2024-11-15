import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Importation des styles globaux
import App from './App';  // Importation du composant principal
import reportWebVitals from './reportWebVitals'; // (optionnel pour la mesure des performances)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // L'élément du DOM où l'application sera montée
);

reportWebVitals();
