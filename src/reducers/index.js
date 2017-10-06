import * as actions from '../actions';

const initialState = {
  showLandingPage: false,
  quotes: [],
  quotesToDisplay: []
}

export const quoteCatcherReducer = (state=initialState, action) => {
  if (action.type === actions.DISPLAY_LANDING_PAGE) {
    return Object.assign({}, state, {
      showLandingPage: !state.showLandingPage
    });
  }

  if (action.type === actions.ADD_QUOTE) {
    return Object.assign({}, state, {
      quotes: [...state.quotes, {
        quotesString: action.quoteString,
        theme: action.theme || "None",
        author: action.author || "Unknown"
      }]
    });
  }

  if (action.type === actions.ADD_QUOTE_TO_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      quotesToDisplay: [action.quotes]
    });
  }
  return state;
}