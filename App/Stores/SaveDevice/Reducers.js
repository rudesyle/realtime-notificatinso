/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from "reduxsauce";
import { INITIAL_STATE } from "./InitialState";
import { SaveDeviceTypes } from "./Actions";

export const saveDeviceLoading = state => ({
  ...state,
  saveDeviceLoading: true,
  saveDeviceErrorMessage: null
});

export const saveDeviceSuccess = (state, { device }) => ({
  ...state,
  device,
  saveDeviceLoading: false,
  saveDeviceErrorMessage: null
});

export const saveDeviceFailure = (state, { errorMessage }) => ({
  ...state,
  device: {},
  saveDeviceLoading: false,
  saveDeviceErrorMessage: errorMessage
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SaveDeviceTypes.SAVE_DEVICE_LOADING]: saveDeviceLoading,
  [SaveDeviceTypes.SAVE_DEVICE_SUCCESS]: saveDeviceSuccess,
  [SaveDeviceTypes.SAVE_DEVICE_FAILURE]: saveDeviceFailure
});
