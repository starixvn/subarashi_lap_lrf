import * as gridDataAction from '@jsroot/actions/gridDataAction';
import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterAction from './filterAction';
import * as usernameAction from '@jsroot/actions/usernameAction';
import * as playerDataAction from './playerDataAction';
import * as gridHandlerAction  from '../../../actions/gridHandlerAction';

export const ActionCreators = Object.assign({},
    gridDataAction,
    loaderAction,
    filterAction,
    usernameAction,
    playerDataAction,
    gridHandlerAction
);