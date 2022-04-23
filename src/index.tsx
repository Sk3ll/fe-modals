import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import setupStore from './store';
import ModalWindow from './components/ModalWindow';

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalWindow />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
