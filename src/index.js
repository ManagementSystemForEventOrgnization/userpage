import './setupProxy';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';

import './index.css';
import App from './App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import './asserts/styles/index.scss';
import 'antd/dist/antd.css';
require('dotenv').config();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
