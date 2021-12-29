import createReducer from '../../../../lib/createReducer'
import { SET_GRID_DATA, SET_SELECTED_VIEW_EVENT } from '../../actions/resultAmendment/types'

export const gridData = createReducer({}, {
    [SET_GRID_DATA](state, action) {
        return action.data;
    }
});

export const selectedViewEvent = createReducer(null, {
    [SET_SELECTED_VIEW_EVENT](state, action) {
        return action.data;
    }
});