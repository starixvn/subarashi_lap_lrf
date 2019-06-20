import { SET_PARAM, SET_PLAYER_LIST, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER } from './types'
import PlayerListService from '../lib/playerListService';
import { setSelectedPlayer } from './commonAction';

export const searchPlayer = (param) => (dispatch) => {
    let service = new PlayerListService();
    service.getPlayerList(param).then(result => {
        const { playerList } = result;
        dispatch(setPlayerList(playerList));

        if (playerList.length === 0) {
            dispatch(setSelectedPlayer(null));
        } else if (playerList.length === 1) {
            dispatch(setSelectedPlayer(playerList[0]));
        }
    })
}

const setPlayerList = (data) => {
    return {
        type: SET_PLAYER_LIST,
        data
    }
}

export const setParam = (data) => {
    return {
        type: SET_PARAM,
        data
    }
}

export const setAdvancedSearch = (data) => {
    return {
        type: SET_ADVANCED_SEARCH,
        data
    }
}

export const setCollapseFilter = (data) => {
    return {
        type: SET_COLLAPSE_FILTER,
        data
    }
}