import { put, call } from "redux-saga/effects";
import SaveDeviceActions from "App/Stores/SaveDevice/Actions";
import { userService } from "App/Services/UserService";

export function* saveDevice() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(SaveDeviceActions.saveDeviceLoading());

  // Fetch user informations from an API
  const device = yield call(userService.saveDevice);
  if (device) {
    yield put(SaveDeviceActions.saveDeviceSuccess(device));
  } else {
    yield put(
      SaveDeviceActions.saveDeviceFailure(
        "There was an error while saving your device information."
      )
    );
  }
}
