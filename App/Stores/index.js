import { combineReducers } from "redux";
import rootSaga from "App/Sagas";
import configureStore from "./CreateStore";
import { reducer as LoginReducer } from "./Login/Reducers";
import { reducer as SaveDeviceReducer } from "./SaveDevice/Reducers";
import { reducer as KeywordListReducer } from "./KeywordList/Reducers";

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: LoginReducer,
    saveDevice: SaveDeviceReducer,
    keywordList: KeywordListReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
