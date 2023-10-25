import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterHandlerAction from './filterHandlerAction';
import * as tabHandlerAction from './tabHandlerAction';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'

export const ActionCreators = Object.assign({},
    loaderAction,
    filterHandlerAction,
    tabHandlerAction,
    dateRangeAction
);
