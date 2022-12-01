import filterAction from './filterAction';
import dataAction from './dataAction';
import sportAction from './sportAction';
import bettypeAction from './bettypeAction';
import * as productAction from '@jsroot/actions/productAction'
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as statusAction from '@jsroot/actions/statusAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as reasonListAction from '@jsroot/actions/reasonListAction'


export default {
    ...filterAction,
    ...dataAction,
    ...sportAction,
    ...bettypeAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...statusAction,
    ...loaderAction,
    ...dateRangeAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...usernameAction,
    ...reasonListAction
}