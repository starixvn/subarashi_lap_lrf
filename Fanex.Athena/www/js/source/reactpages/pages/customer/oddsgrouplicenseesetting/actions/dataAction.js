import * as types from './types';

export const setData = data => {
    return {
        type: types.SET_DATA,
        data
    }
}

export const setDataList = data => {
    return {
        type: types.SET_DATA_LIST,
        data
    }
}

export const setUpdateDataList = data => {
    return {
        type: types.SET_UPDATE_DATA_LIST,
        data
    }
}

export const setUpdatedStatusList = data => {
    return {
        type: types.SET_UPDATED_STATUS_LIST,
        data
    }
}