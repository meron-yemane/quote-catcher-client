import * as actions from './/actions';

const initialState = {
  showLandingPage: false
}

export const quoteCatcherReducer = (state=initialState, action) => {
  if (action.type === actions.DISPLAY_LANDING_PAGE) {
    return Object.assign({}, state, {
      showLandingPage: !showLandingPage
    });
  }
  return state;
}