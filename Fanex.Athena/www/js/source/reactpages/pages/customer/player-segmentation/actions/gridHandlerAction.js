import { SET_SWEET_ALERT_OPTION, SET_PAGING_OPTION, SET_SELECTED_PLAYER } from './types';
export const setSweetAlertOption = options => {
    return {
        type: SET_SWEET_ALERT_OPTION,
        data: options
    }
}

export const setPagingOption = (data) => {
    return {
        type: SET_PAGING_OPTION,
        data
    }
}

export const setSelectedPlayer = (data) => {
    return {
        type: SET_SELECTED_PLAYER,
        data
    }
}