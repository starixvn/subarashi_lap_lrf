import PlayerListService from '../lib/playerListService';
import { SET_SELECTED_PLAYERID_LIST } from './types';

export const getLink = (systemType, action) => () => {
    const service = new PlayerListService();
    return service.getLink(systemType, action);
}

export const getTabList = () => () => {
    const service = new PlayerListService();
    return service.getTabList();
}

export const setSelectedPlayerIdList = (data) => {
    return {
        type: SET_SELECTED_PLAYERID_LIST,
        data
    }
}