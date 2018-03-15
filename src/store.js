import {compose, createStore, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {quoteCatcherReducer} from './reducers/index';
import {persistCombineReducers, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = persistCombineReducers(persistConfig, {
  quoteCatcherReducer,
  form: formReducer
});

const configureStore = () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;