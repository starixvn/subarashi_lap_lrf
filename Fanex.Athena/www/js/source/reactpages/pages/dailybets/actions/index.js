import * as gridDataAction from '@jsroot/actions/gridDataAction';
import * as productAction from '@jsroot/actions/productAction';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as loaderAction from '@jsroot/actions/loaderAction';
import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as reportTitleAction from '@jsroot/actions/reportTitleAction';

import { SET_DATE } from './types';

const setDate = (data) => {
    return {
        type: SET_DATE,
        data
    }
}

export const ActionCreators = Object.assign({},
    gridDataAction,
    productAction,
    currencyAction,
    loaderAction,
    requestParamAction,
    reportTitleAction,
    setDate
);