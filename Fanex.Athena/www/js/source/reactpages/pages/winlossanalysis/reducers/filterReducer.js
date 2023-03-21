import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedVipOnly = createReducer({}, {
    [types.SET_SELECTED_VIPONLY](state, action) {
        return action.data
    }
});

export const isGroupInOriginalCurrency = createReducer(true, {
    [types.SET_GROUP_IN_ORIGINAL_CURRENCY](state, action) {
        return action.data
    }
});

export const isExcludeTestData = createReducer(true, {
    [types.SET_EXCLUDE_TEST_DATA](state, action) {
        return action.data
    }
});

export const isViewCashOutOnly = createReducer(false, {
    [types.SET_VIEW_CASH_OUNT_ONLY](state, action) {
        return action.data
    }
});

export const selectedGroupByOption = createReducer({}, {
    [types.SET_SELECTED_GROUPBYOPTION](state, action) {
        return action.data
    }
});

export const selectedBreakDownByOption = createReducer({}, {
    [types.SET_SELECTED_BREAKBYOPTION](state, action) {
        return action.data
    }
});

export const selectedOddsGroup = createReducer({}, {
    [types.SET_SELECTED_ODDSGROUP](state, action) {
        return action.data
    }
});