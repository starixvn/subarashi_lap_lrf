import filterAction from './filterAction';
import dataAction from './dataAction';
import promotionTypeAction from './promotionTypeAction';
import * as productAction from '@jsroot/actions/productAction'
import * as currencyAction from '@jsroot/actions/currencyAction'
import * as baseCurrencyAction from '@jsroot/actions/baseCurrencyAction'
import * as loaderAction from '@jsroot/actions/loaderAction'
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'
import * as userGuideAction from '@jsroot/actions/userGuideAction'
import * as requestParamAction from '@jsroot/actions/requestParamAction'
import * as reportTitleAction from '@jsroot/actions/reportTitleAction'


export default {
    ...filterAction,
    ...dataAction,
    ...promotionTypeAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...loaderAction,
    ...dateRangeAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction
}