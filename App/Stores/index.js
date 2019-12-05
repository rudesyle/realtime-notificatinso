import { combineReducers } from 'redux';
import rootSaga from 'App/Sagas'
import configureStore from './CreateStore'
import { reducer as LoginReducer } from './Login/Reducers';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: LoginReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
