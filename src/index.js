import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
//import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/es/integration/react';

const { persistor, store } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();