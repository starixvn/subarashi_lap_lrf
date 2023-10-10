import { combineReducers } from 'redux';
import * as dataHandlerReducer from './dataHandlerReducer.js'
import * as filterHandlerReducer from './filterHandlerReducer.js'
import * as currencyReducer from '../../../reducers/currencyReducer'
import * as loaderReducer from '../../../reducers/loaderReducer'
import * as excludeTestReducer from '../../../reducers/excludeTestReducer'
import * as dateRangeReducer from '../../../reducers/dateRangeReducer'
import * as subsidiaryReducer from '../../../reducers/subsidiaryReducer'
import * as usernameReducer from '@jsroot/reducers/usernameReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'

export default combineReducers(Object.assign(
    dataHandlerReducer,
    filterHandlerReducer,
    currencyReducer,
    loaderReducer,
    excludeTestReducer,
    dateRangeReducer,
    subsidiaryReducer,
    usernameReducer,
    userGuideReducer
));