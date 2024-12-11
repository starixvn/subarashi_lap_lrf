import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterAction from './filterAction';
import * as userGuideAction from '@jsroot/actions/userGuideAction';
import * as dataAction from '../../../actions/dataAction';


export const ActionCreators = Object.assign({},
    loaderAction,
    filterAction,
    userGuideAction,
    dataAction
);