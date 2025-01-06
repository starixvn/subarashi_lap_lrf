import { combineReducers } from 'redux';
import * as gridDataReducer from './gridDataReducer.js'
import * as productReducer from '@jsroot/reducers/productReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as statusReducer from '@jsroot/reducers/statusReducer'
import * as liveStatusReducer from '@jsroot/reducers/liveStatusReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as sportReducer from './sportReducer'
import * as bettypeReducer from './bettypeReducer'
import * as leagueReducer from './leagueReducer'
import * as matchReducer from './matchReducer'
import * as usernameReducer from '@jsroot/reducers/usernameReducer'
import * as convertAllReducer from '@jsroot/reducers/convertAllReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as commonReducer from '../../common/components/reducer';
import * as ipReducer from './ipReducer';
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer';
import * as platform from './platformReducer';
import * as oddsGroups from './oddsGroupsReducer';
import * as customerClass from './customerClassReducer';
import * as filterReducer from './filterReducer';

export default combineReducers(Object.assign(
    gridDataReducer,
    productReducer,
    currencyReducer,
    baseCurrencyReducer,
    statusReducer,
    liveStatusReducer,
    loaderReducer,
    dateRangeReducer,
    requestParamReducer,
    reportTitleReducer,
    sportReducer,
    bettypeReducer,
    leagueReducer,
    matchReducer,
    usernameReducer,
    convertAllReducer,
    userGuideReducer,
    commonReducer,
    ipReducer,
    subsidiaryReducer,
    platform,
    oddsGroups,
    customerClass,
    filterReducer
));