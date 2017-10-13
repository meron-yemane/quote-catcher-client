import * as actions from '../actions';

const initialState = {
  showLandingPage: false,
  quotes: [],
  quotesToDisplay: []
}

export const quoteCatcherReducer = (state=initialState, action) => {
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