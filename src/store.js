import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {quoteCatcherReducer} from './reducers/index';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {setAuthToken} from './actions/index';


const store = createStore(
  combineReducers({
    quoteCatcherReducer,
    form: formReducer
  }),
  applyMiddleware(thunk)
);

//reloading authtoken when application loads
// const authToken = loadAuthToken();
// console.log("authToken: " + authToken)
// if (authToken) {
//   const token = authToken;
//   console.log(store.dispatch)
//   store.dispatch(setAuthToken(token));
// }


export default store;