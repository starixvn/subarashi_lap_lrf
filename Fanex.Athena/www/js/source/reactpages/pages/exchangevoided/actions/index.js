import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as dataAction from './dataAction';
import * as filterAction from './filterAction';

export const ActionCreators = Object.assign({},
    requestParamAction,
    dataAction,
    filterAction
);