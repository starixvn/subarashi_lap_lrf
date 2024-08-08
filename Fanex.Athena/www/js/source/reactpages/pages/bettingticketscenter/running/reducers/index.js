import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js'
import * as usernameReducer from '@jsroot/reducers/usernameReducer'
import * as productReducer from '@jsroot/reducers/productReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as statusReducer from '@jsroot/reducers/statusReducer'
import * as liveStatusReducer from '@jsroot/reducers/liveStatusReducer'
import * as convertAllReducer from '@jsroot/reducers/convertAllReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as commonReducer from '../../common/components/reducer'
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer'
import * as sportReducer from './sportReducer'
import * as bettypeReducer from './bettypeReducer'
import * as leagueReducer from './leagueReducer'
import * as matchReducer from './matchReducer'
import * as ipReducer from './ipReducer';
import * as platform from './platformReducer';
import * as oddsGroups from './oddsGroupsReducer';
import * as customerClass from './customerClassReducer';

export default combineReducers(Object.assign(
    gridDataReducer,
    usernameReducer,
    productReducer,
    currencyReducer,
    baseCurrencyReducer,
    loaderReducer,
    requestParamReducer,
    reportTitleReducer,
    statusReducer,
    liveStatusReducer,
    convertAllReducer,
    userGuideReducer,
    commonReducer,
    subsidiaryReducer,
    sportReducer,
    bettypeReducer,
    leagueReducer,
    matchReducer,
    ipReducer,
    platform,
    oddsGroups,
    customerClass
));