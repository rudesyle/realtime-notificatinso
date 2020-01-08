/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { FetchKeywordsTypes } from './Actions';

export const fetchKeywordsLoading = (state) => ({
  ...state,
  keywords: [],
  fetchKeywordsLoading: true,
  fetchKeywordsErrorMessage: null,
});

export const fetchKeywordsSuccess = (state, { keywords }) => ({
  ...state,
  keywords,
  fetchKeywordsLoading: false,
  fetchKeywordsErrorMessage: null,
});

export const fetchKeywordsFailure = (state, { errorMessage }) => ({
  ...state,
  keywords: [],
  fetchKeywordsLoading: false,
  fetchKeywordsErrorMessage: errorMessage,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [FetchKeywordsTypes.FETCH_KEYWORDS_LOADING]: fetchKeywordsLoading,
  [FetchKeywordsTypes.FETCH_KEYWORDS_SUCCESS]: fetchKeywordsSuccess,
  [FetchKeywordsTypes.FETCH_KEYWORDS_FAILURE]: fetchKeywordsFailure,
});
