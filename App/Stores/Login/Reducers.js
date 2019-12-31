/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from "reduxsauce";
import { INITIAL_STATE } from "./InitialState";
import { LoginTypes } from "./Actions";

export const fetchUserLoading = state => ({
  ...state,
  userIsLoading: true,
  userErrorMessage: null
});

export const fetchUserSuccess = (state, { user }) => ({
  ...state,
  user,
  userIsLoading: false,
  userErrorMessage: null
});

export const fetchUserFailure = (state, { errorMessage }) => ({
  ...state,
  user: {},
  userIsLoading: false,
  userErrorMessage: errorMessage
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.FETCH_USER_LOADING]: fetchUserLoading,
  [LoginTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [LoginTypes.FETCH_USER_FAILURE]: fetchUserFailure,
});
