import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterHandlerAction from './filterHandlerAction';
import * as tabHandlerAction from './tabHandlerAction';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';
import * as customerInfoAction from './customerInfoHandlerAction';

export const ActionCreators = Object.assign({},
    loaderAction,
    filterHandlerAction,
    tabHandlerAction,
    dateRangeAction,
    customerInfoAction
);
