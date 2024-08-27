import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as loaderAction from '@jsroot/actions/loaderAction';
import * as dataAction from './dataAction';
import * as filterAction from './filterAction';
import * as currencyAction from '../../../actions/currencyAction'
import * as baseCurrencyAction from '../../../actions/baseCurrencyAction'
import * as convertAllAction from '../../../actions/convertAllAction'

export const ActionCreators = Object.assign({},
    requestParamAction,
    dataAction,
    currencyAction,
    baseCurrencyAction,
    convertAllAction,
    filterAction,
    loaderAction
);