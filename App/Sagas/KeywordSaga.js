/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { put, call } from 'redux-saga/effects';
import FetchKeywordsActions from 'App/Stores/KeywordList/Actions';
import { userService } from 'App/Services/UserService';

export function* fetchKeywords() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(FetchKeywordsActions.fetchKeywordsLoading());

  // Fetch user informations from an API
  const keywords = yield call(userService.fetchKeywords);
 
  if (keywords) {
    yield put(FetchKeywordsActions.fetchKeywordsSuccess(keywords));
  } else {
    yield put(
      FetchKeywordsActions.fetchKeywordsFailure(
        'There was an error while retrieving keywords.',
      ),
    );
  }
}
