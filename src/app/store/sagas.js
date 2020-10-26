import { take, put, select, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from './actions';

const url = 'http://localhost:8087';

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

export function* fetchTableDataSaga() {
  while(true) {
    yield take([actions.FETCH_TABLE_DATA, actions.FETCH_TABLE_DATA_SUCCESS]);
    try {
      const res = yield axios.get(url + '/fetchTableData');
      const data = res.data;
      yield put({ type: actions.FETCH_TABLE_DATA_SUCCESS, data });
    } catch (err) {
      console.log(err.message);
    }
  }
}
