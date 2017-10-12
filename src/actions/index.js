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