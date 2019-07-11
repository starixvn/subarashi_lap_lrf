import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterHandlerAction from './filterHandlerAction';
import * as playerDetailHandlerAction from './playerDetailHandlerAction';
import * as commonAction from './commonAction';
import * as gridHandlerAction from './gridHandlerAction';
import * as gridCommandHandlerAction from './gridCommandHandlerAction';
import * as gridOddsGroupAction from './gridOddsGroupAction';
import * as gridSpecialLevelAction from './gridSpecialLevelAction';
import * as gridStatusAction from './gridStatusAction';
import * as gridUserNameAction from './gridUserNameAction';

export const ActionCreators = Object.assign({},
    loaderAction,
    commonAction,
    filterHandlerAction,
    playerDetailHandlerAction,
    gridHandlerAction,
    gridCommandHandlerAction,
    gridOddsGroupAction,
    gridSpecialLevelAction,
    gridStatusAction,
    gridUserNameAction
);