import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterAction from './filterAction';
import * as dataAction from '../../../actions/dataAction';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction'


export const ActionCreators = Object.assign({},
    loaderAction,
    filterAction,
    dataAction,
    dateRangeAction
);