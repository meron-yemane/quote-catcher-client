import * as actions from '../actions';

const initialState = {
  showLandingPage: false,
  quotes: [],
  quotesToDisplay: [],
  authToken: null,
  currentUser: null,
  error: null,
  data: ''
};

export const quoteCatcherReducer = (state=initialState, action) => {
  if (action.type === actions.FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  }

  if (action.type === actions.FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }

  if (action.type === actions.SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  }

  if (action.type === actions.SET_CURRENT_USER) {
    return Object.assign({}, state, {
      currentUser: action.currentUser
    });
  }

  if (action.type === actions.DISPLAY_LANDING_PAGE) {
    return Object.assign({}, state, {
      showLandingPage: action.showLandingPage
    });
  }

  if (action.type === actions.ADD_QUOTES_TO_LANDING_PAGE) {
    return Object.assign({}, state, {
      quotes: [action.quotes]
    });
  }

  if (action.type === actions.ADD_QUOTE_TO_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      quotesToDisplay: [action.quotes]
    });
  }
  return state;
}