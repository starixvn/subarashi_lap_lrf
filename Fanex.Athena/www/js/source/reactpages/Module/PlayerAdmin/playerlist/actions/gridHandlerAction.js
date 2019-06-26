import { SET_DISPLAYED_COLUMN_LIST, SET_PLAYER_LIST } from './types';

export const setDisplayedColumnList = (data) => {
    return {
        type: SET_DISPLAYED_COLUMN_LIST,
        data
    }
}

export const setPlayerList = (data) => {
    return {
        type: SET_PLAYER_LIST,
        data
    }
}