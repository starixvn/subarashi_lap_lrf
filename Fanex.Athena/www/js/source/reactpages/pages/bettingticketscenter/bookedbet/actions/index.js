import * as gridDataAction from '@jsroot/actions/gridDataAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as statusAction from '@jsroot/actions/statusAction'
import * as platformAction from '@jsroot/actions/platformAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'
import * as convertAllAction from '@jsroot/actions/convertAllAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as filterHandlerAction from './filterHandlerAction.js'

export const ActionCreators = Object.assign({},
    gridDataAction,
    baseCurrencyAction,
    currencyAction,
    statusAction,
    platformAction,
    loaderAction,
    dateRangeAction,
    convertAllAction,
    requestParamAction,
    reportTitleAction,
    filterHandlerAction,
    userGuideAction
);