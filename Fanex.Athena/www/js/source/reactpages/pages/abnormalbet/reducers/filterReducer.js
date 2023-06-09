import * as types from '../actions/types';
import createReducer from '@jsroot/lib/createReducer.js';

const reportFilter = createReducer(null, {
   [types.SET_REPORT_FILTER](state, action){
      return action.data
   }
})


const isConvertAllToBaseCurrency = createReducer(true, {
   [types.SET_CONVERT_ALL_TO_BASE_CURRENCY](state, action){
      return action.data
   }
})

export default {
   reportFilter,
   isConvertAllToBaseCurrency
}