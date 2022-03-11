import React from 'react';
import ReactDOM from 'react-dom';
import 'modern-normalize/modern-normalize.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persisStore } from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persisStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
