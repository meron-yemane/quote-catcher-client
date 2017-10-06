import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {quoteCatcherReducer} from './reducers/index';

export default createStore(
  combineReducers({
    quoteCatcherReducer,
    form: formReducer
  })
);