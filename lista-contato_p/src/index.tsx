import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // se estiver usando CSS
import App from './App'; // seu componente principal
import { Provider } from 'react-redux';
import { store } from './store/store'; // verifique se o Redux está configurado corretamente

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
