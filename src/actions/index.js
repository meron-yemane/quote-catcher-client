export const DISPLAY_LANDING_PAGE = 'DISPLAY_LANDING_PAGE';
export const displayLandingPage =  showLandingPage => ({
  type: DISPLAY_LANDING_PAGE,
  showLandingPage
});

export const ADD_QUOTE = 'ADD_QUOTE';
export const addQuote = (quoteString, author, theme) => ({
  type: ADD_QUOTE, 
  quoteString,
  author,
  theme
});

export const ADD_QUOTE_TO_SEARCH_RESULTS = 'ADD_QUOTE_TO_SEARCH_RESULTS';
export const addQuoteToSearchResults = (quotes) => ({
  type: ADD_QUOTE_TO_SEARCH_RESULTS,
  quotes
});