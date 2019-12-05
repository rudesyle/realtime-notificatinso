import { takeLatest, all } from 'redux-saga/effects';
import { LoginTypes } from 'App/Stores/Login/Actions';
import { StartupTypes } from 'App/Stores/Startup/Actions';
import { fetchUser } from './LoginSaga';
import { startup } from './StartupSaga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(LoginTypes.FETCH_USER, fetchUser),
  ]);
}
