import * as gridDataAction from '@jsroot/actions/gridDataAction'
import * as productAction from '@jsroot/actions/productAction'
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as statusAction from '@jsroot/actions/statusAction'
import * as liveStatusAction from '@jsroot/actions/liveStatusAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'
import * as sportAction from './sportAction.js'
import * as bettypeAction from './bettypeAction.js'
import * as filterAction from './filterAction.js'
import * as dataAction from './dataAction.js'
import * as platformAction from '@jsroot/actions/platformAction'
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as convertAllAction from '@jsroot/actions/convertAllAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction'
import * as customerClassAction from '@jsroot/actions/customerclassAction'

export const ActionCreators = Object.assign({},
    gridDataAction,
    productAction,
    currencyAction,
    baseCurrencyAction,
    statusAction,
    liveStatusAction,
    loaderAction,
    dateRangeAction,
    requestParamAction,
    reportTitleAction,
    sportAction,
    bettypeAction,
    filterAction,
    usernameAction,
    convertAllAction,
    userGuideAction,
    subsidiaryAction,
    platformAction,
    customerClassAction,
    dataAction
);