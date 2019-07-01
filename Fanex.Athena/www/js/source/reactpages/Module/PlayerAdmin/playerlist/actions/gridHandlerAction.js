import { SET_DISPLAYED_COLUMN_LIST, SET_PLAYER_LIST, SET_CURRENT_ACTIVE_PLAYER, SET_PAGING } from './types';
import PlayerListService from '../lib/playerListService';

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

export const setCurrentActivePlayer = (data) => {
    return {
        type: SET_CURRENT_ACTIVE_PLAYER,
        data
    }
}

export const setPagingOption = (data) => {
    return {
        type: SET_PAGING,
        data
    }
}

export const exportExcel = (licType, param) => () => {
    const service = new PlayerListService();
    service.exportExcel(licType, param);
}