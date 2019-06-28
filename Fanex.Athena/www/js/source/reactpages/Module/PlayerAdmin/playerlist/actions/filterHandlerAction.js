import { SET_PARAM, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER } from './types'
import PlayerListService from '../lib/playerListService';
import { setSelectedPlayer } from './commonAction';
import { setPlayerList, setPagingOption } from './gridHandlerAction';
import { defaultPagingOption } from '../lib/constants.js';

export const searchPlayer = (param) => (dispatch) => {
    const service = new PlayerListService();
    service.getPlayerList(param).then(result => {
        const { playerList, totalItem } = result;
        dispatch(setPlayerList(playerList));

        const pagingOption = {
            ...defaultPagingOption,
            PageIndex: param.pageIndex,
            PageSize: param.pageSize,
            TotalItem: totalItem
        }
        dispatch(setPagingOption(pagingOption));

        if (playerList.length === 0) {
            dispatch(setSelectedPlayer(null));
        } else if (playerList.length === 1) {
            dispatch(setSelectedPlayer(playerList[0]));
        }
    })
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