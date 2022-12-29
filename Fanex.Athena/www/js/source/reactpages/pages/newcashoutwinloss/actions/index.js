import filterAction from './filterAction';
import dataAction from './dataAction';
import sportAction from './sportAction';
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction'


export default {
    ...filterAction,
    ...dataAction,
    ...sportAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...loaderAction,
    ...dateRangeAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...subsidiaryAction
}