import { takeLatest, all } from "redux-saga/effects";
import { LoginTypes } from "App/Stores/Login/Actions";
import { StartupTypes } from "App/Stores/Startup/Actions";
import { SaveDeviceTypes } from "App/Stores/SaveDevice/Actions";
import { FetchKeywordsTypes } from "App/Stores/KeywordList/Actions";
import { fetchUser } from "./LoginSaga";
import { startup } from "./StartupSaga";
import { saveDevice } from "./SaveDeviceSaga";
import { fetchKeywords } from "./KeywordSaga";

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(LoginTypes.FETCH_USER, fetchUser),
    takeLatest(SaveDeviceTypes.SAVE_DEVICE, saveDevice),
    takeLatest(FetchKeywordsTypes.FETCH_KEYWORDS, fetchKeywords),
  ]);
}
