import PlayerListQueryService from '../lib/playerListQueryService';
import { SET_SELECTED_PLAYERID_LIST, SET_SELECTED_TAB_NAME } from './types';

export const getLink = (systemType, action) => () => {
    const service = new PlayerListQueryService();
    return service.getLink(systemType, action);
}

export const getTabList = () => () => {
    const service = new PlayerListQueryService();
    return service.getTabList();
}

export const setSelectedPlayerIdList = (data) => {
    return {
        type: SET_SELECTED_PLAYERID_LIST,
        data
    }
}

export const setSelectedTabName = (data) => {
    return {
        type: SET_SELECTED_TAB_NAME,
        data
    }
}