import * as gridDataAction from '@jsroot/actions/gridDataAction'
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as productAction from '@jsroot/actions/productAction'
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'
import * as statusAction from '@jsroot/actions/statusAction'
import * as convertAllAction from '@jsroot/actions/convertAllAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction'
import * as liveStatusAction from '@jsroot/actions/liveStatusAction'
import * as sportAction from './sportAction'
import * as bettypeAction from './bettypeAction'
import * as leagueAction from './leagueAction'
import * as matchAction from './matchAction'
import * as platformAction from './platformAction'
import * as oddsGroupsAction from './oddsGroupsAction'
import * as customerClassAction from './customerClassAction'
import * as ipAction from './ipAction.js'

export const ActionCreators = Object.assign({},
    gridDataAction,
    usernameAction,
    productAction,
    currencyAction,
    baseCurrencyAction,
    loaderAction,
    requestParamAction,
    reportTitleAction,
    statusAction,
    liveStatusAction,
    convertAllAction,
    userGuideAction,
    subsidiaryAction,
    sportAction,
    bettypeAction,
    leagueAction,
    matchAction,
    platformAction,
    oddsGroupsAction,
    customerClassAction,
    ipAction
);