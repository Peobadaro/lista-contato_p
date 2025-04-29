import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // se estiver usando CSS
import App from './App'; // seu componente principal
import { Provider } from 'react-redux';
import { store } from './store/store'; // verifique se o Redux está configurado corretamente

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
