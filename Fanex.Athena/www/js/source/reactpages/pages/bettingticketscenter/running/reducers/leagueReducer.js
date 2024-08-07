import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedLeague = createReducer({}, {
    [types.SET_SELECTED_LEAGUE](state, action) {
        return action.data
    }
});

export const leagueList = createReducer({}, {
    [types.SET_LEAGUE_LIST](state, action) {
        return action.data;
    }
});

export const isOutRightLeauge = createReducer({}, {
    [types.SET_IS_OUTRIGHT](state, action) {
        return action.data;
    }
});

export const isEnableMatch = createReducer({}, {
    [types.SET_ENABLE_MATCH](state, action) {
        return action.data;
    }
});