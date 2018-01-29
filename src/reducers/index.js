import * as actions from '../actions';

const initialState = {
  searchedQuotes: [],
  quotesToDisplay: [],
  addQuoteDisplay: [],
  authToken: null,
  currentUser: null,
  error: null,
  timer: null,
  quotesToDisplayAddThemeId: null,
  data: '',
  isFetching: false,
  isOpen: false,
  quoteCounter: 0,
  fadeInOrOut: "fadeOut",
  currentAddThemeQuote: null, 
  previousAddThemeQuotes: []
};

export const quoteCatcherReducer = (state=initialState, action) => {
  if (action.type === actions.UPDATE_THEME_TO_ADD_BOX_ID) {
    if (state.quotesToDisplayAddThemeId === action.quoteId) {
      return {
        ...state,
        quotesToDisplayAddThemeId: action.quoteId,
        isOpen: !state.isOpen,
      }
    }
    return {
      ...state,
      quotesToDisplayAddThemeId: action.quoteId,
      isOpen: true,
    }
  }

  if (action.type === actions.PREVIOUS_ADD_THEME_QUOTES) {
    return {
      ...state,
      previousAddThemeQuotes: state.previousAddThemeQuotes.concat([action.quoteId])
    }
  }

  if (action.type === actions.CURRENT_ADD_THEME_QUOTE) {
    return {
      ...state, 
      currentAddThemeQuote: action.currentQuote
    }
  }

  if (action.type === actions.FADE_IN_OR_OUT) {
    return {
      ...state,
      fadeInOrOut: action.currTrans
    }
  }

  if (action.type === actions.NEXT_QUOTE_TO_BE_DISPLAYED) {
    return {
      ...state,
      quoteCounter: state.quoteCounter + 1
    }
  }

  if (action.type === actions.UPDATE_THEME_FOR_SEARCHED_QUOTES) {
    return {
      ...state,
      searchedQuotes: state.searchedQuotes.map(
        quote => quote._id === action.quoteId ? (quote.theme.includes("None") ? {...quote, theme: [action.themes]} : {...quote, theme: quote.theme.concat(action.themes)}) : quote
      )
    }
  }

  if (action.type === actions.DELETE_QUOTE_FROM_SEARCHED_QUOTES) {
    return {
      ...state, 
      searchedQuotes: state.searchedQuotes.filter(quote => quote._id !== action.quoteId)
    }
  }

  if (action.type === actions.TIMER_START) {
    return Object.assign({}, state, {
      quoteCounter: 0
    });
  }

  if (action.type === actions.TIMER_TICK) {
    return Object.assign({}, state, {
      quoteCounter: state.quoteCounter + 1
    });
  }

  if (action.type === actions.REQUEST_QUOTES_FOR_HOMEPAGE) {
    return Object.assign({}, state, {
    isFetching: true, 
    error: null      
    });
  }

  if (action.type === actions.REQUEST_QUOTES_FOR_HOMEPAGE_SUCCESS) {
    return {
      ...state,
      quotesToDisplay: action.quotes,
      isFetching: false,
      error: null
    }
  }

  if (action.type === actions.REQUEST_QUOTES_FOR_HOMEPAGE_ERROR) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    });
  }

  if (action.type === actions.ADD_QUOTE_DISPLAY) {
    return Object.assign({}, state, {
      addQuoteDisplay: action.quote
    });
  }

  // if (action.type === actions.SET_QUOTES_TO_DISPLAY) {
  //   return Object.assign({}, state, {
  //     quotesToDisplay: action.quotes
  //   });
  // }

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
      searchedQuotes: action.quotes
    });
  }
  return state;
}