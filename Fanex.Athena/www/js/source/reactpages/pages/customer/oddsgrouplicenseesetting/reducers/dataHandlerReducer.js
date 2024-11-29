import createReducer from '@jsroot/lib/createReducer.js'
import { SET_DATA_LIST, SET_DATA, SET_UPDATE_DATA_LIST, SET_UPDATED_STATUS_LIST } from '../actions/types.js'

export const dataList = createReducer(null, {
    [SET_DATA_LIST](prevState, action) {
        return action.data && [...action.data];
    }
})

export const data = createReducer(null, {
    [SET_DATA](prevState, action) {
        return action.data && {...action.data};
    }
})

export const updateDataList = createReducer(null, {
    [SET_UPDATE_DATA_LIST](prevState, action) {
        return action.data && {...action.data};
    }
})

export const updatedStatusList = createReducer(null, {
    [SET_UPDATED_STATUS_LIST](prevState, action) {
        return action.data && {...action.data};
    }
})