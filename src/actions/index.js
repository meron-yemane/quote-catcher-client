import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {saveAuthToken, clearAuthToken} from '../local-storage';
import store from '../store';


const normalizeResponseErrors = res => {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
    ) {
      return res.json().then(err => Promise.reject(err));
    }
    return Promise.reject({
      code: res.status,
      message: res.statusText
    });
  }
  return res;
}

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  saveAuthToken(authToken);
  dispatch(setCurrentUser(decodedToken.user));
};

export const login = (username, password) => dispatch => {    
    return (fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'Content-Type': 'application/json'
      }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({authToken}) => {
      return storeAuthInfo(authToken, dispatch)
    })
    .catch(err => {
      const {code} = err;
      if (code === 401) {
        return Promise.reject(
          new SubmissionError({
            _error: 'Incorrect username or password'
          })
        );
      }
    })
  );
};

export const loginUserAndUpdateQuotesStore = (values) => dispatch => {
  return dispatch(login(values.username, values.password))
  .then(() => {
    return dispatch(fetchQuotes())
  }) 
};

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const fetchProtectedData = () => (dispatch, getState) => {
  const authToken = getState().quoteCatcherReducer.authToken;
  return fetch(`${API_BASE_URL}/api/users/protected`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  const authToken = getState().quoteCatcherReducer.authToken;
  return fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({authToken}) => storeAuthInfo(authToken, dispatch))
  .catch(err => {
    const {code} = err;
    if (code === 401) {
      //Invalid credentials scenario
      dispatch(setCurrentUser(null));
      dispatch(setAuthToken(null));
      clearAuthToken(authToken)
    }
  });
};

export const deleteQuote = (quoteId) => (dispatch, getState) => {
  const authToken = getState().quoteCatcherReducer.authToken;
  return fetch(`${API_BASE_URL}/api/quotes/deletequote/${quoteId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(() => {
    dispatch(deleteQuoteFromSearchedQuotes(quoteId))
  })
  // .then(res => res.json())
  // .then
};

export const fetchQuotes = () => (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  dispatch(requestQuotesForHomepage());
  return fetch(`${API_BASE_URL}/api/quotes/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
   })
   .then(res => res.json())
   .then(quotes => {
    dispatch(requestQuotesForHomepageSuccess(quotes))
    })
   .catch(error => dispatch(requestQuotesForHomepageError(error)));
};

export const addTheme = (themes, quoteId) => (getState) => {
  const authToken = getState().quoteCatcherReducer.authToken;
  return fetch(`${API_BASE_URL}/api/quotes/addtheme/${quoteId}`, {
    method: 'POST',
    body: JSON.stringify(themes),
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
}

let timer = null;
export const start = () => (dispatch) => {
  timer = setInterval(() => dispatch(timerTick()), 15000);
  dispatch(timerStart());
  dispatch(timerTick());
};

export const UPDATE_THEME_TO_ADD_BOX_ID = 'UPDATE_THEME_TO_ADD_BOX_ID';
export const updateThemeToAddBoxId = quoteId => ({
  type: UPDATE_THEME_TO_ADD_BOX_ID,
  quoteId
});

export const TIMER_START = 'TIMER_START';
export const timerStart = () => ({
  type: TIMER_START
});

export const TIMER_TICK = 'TIMER_TICK';
export const timerTick = () => ({
  type: TIMER_TICK
});

export const REQUEST_QUOTES_FOR_HOMEPAGE = 'REQUEST_QUOTES_FOR_HOMEPAGE';
export const requestQuotesForHomepage = () => ({
  type: REQUEST_QUOTES_FOR_HOMEPAGE
});

export const REQUEST_QUOTES_FOR_HOMEPAGE_SUCCESS = 'REQUEST_QUOTES_FOR_HOMEPAGE_SUCCESS';
export const requestQuotesForHomepageSuccess = quotes => ({
  type: REQUEST_QUOTES_FOR_HOMEPAGE_SUCCESS,
  quotes
});

export const REQUEST_QUOTES_FOR_HOMEPAGE_ERROR = 'REQUEST_QUOTES_FOR_HOMEPAGE_ERROR';
export const requestQuotesForHomepageError = error => ({
  type: requestQuotesForHomepageError,
  error
})

export const ADD_QUOTE_DISPLAY = 'ADD_QUOTE_DISPLAY';
export const addQuoteDisplay = quote => ({
  type: ADD_QUOTE_DISPLAY,
  quote
});

export const DELETE_QUOTE_FROM_SEARCHED_QUOTES = 'DELETE_QUOTE_FROM_SEARCHED_QUOTES';
export const deleteQuoteFromSearchedQuotes = quoteId => ({
  type: DELETE_QUOTE_FROM_SEARCHED_QUOTES,
  quoteId
});

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
  type: FETCH_PROTECTED_DATA_SUCCESS,
  data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
});
 
export const DISPLAY_LANDING_PAGE = 'DISPLAY_LANDING_PAGE';
export const displayLandingPage =  showLandingPage => ({
  type: DISPLAY_LANDING_PAGE,
  showLandingPage
});

export const ADD_QUOTES_TO_LANDING_PAGE = 'ADD_QUOTES_TO_LANDING_PAGE';
export const addQuotesToLandingPage = (quotes) => ({
  type: ADD_QUOTES_TO_LANDING_PAGE, 
  quotes
});

export const ADD_QUOTE_TO_SEARCH_RESULTS = 'ADD_QUOTE_TO_SEARCH_RESULTS';
export const addQuoteToSearchResults = (quotes) => ({
  type: ADD_QUOTE_TO_SEARCH_RESULTS,
  quotes
});