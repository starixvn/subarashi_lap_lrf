import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as reportTitleAction from '@jsroot/actions/reportTitleAction';
import * as usernameAction from '@jsroot/actions/usernameAction';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';
import * as dataAction from './dataAction';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as loaderAction from '@jsroot/actions/loaderAction';
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction';
import * as userGuideAction from '@jsroot/actions/userGuideAction';

export const ActionCreators = Object.assign({},
    requestParamAction,
    reportTitleAction,
    usernameAction,
    dateRangeAction,
    currencyAction,
    loaderAction,
    dataAction,
    subsidiaryAction,
    userGuideAction
);