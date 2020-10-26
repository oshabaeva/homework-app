import { createStore, applyMiddleware, combineReducers } from 'redux';
import {  createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import * as sagas from './sagas';
import * as actions from './actions';



const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tableData(tableData = {}, action) {
      switch(action.type) {
          case actions.FETCH_TABLE_DATA_SUCCESS:
            tableData = action.data.tableData;
            return tableData;
          default:
              return tableData;
      }

    },
    aggregatedData(aggregatedData = {}, action) {
      switch(action.type) {
          case actions.FETCH_TABLE_DATA_SUCCESS:
            aggregatedData = action.data.aggregatedData;
            return aggregatedData;
          default:
            return aggregatedData;

      }

    },
    rates(rates = {}, action) {
      switch(action.type) {
        case actions.FETCH_TABLE_DATA_SUCCESS:
          rates = action.data.rates;
          return rates;
        default:
          return rates;

      }
    }
  }

  ),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas.fetchTableDataSaga);
}
