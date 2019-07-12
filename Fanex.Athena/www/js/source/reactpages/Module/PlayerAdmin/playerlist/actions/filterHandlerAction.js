import { SET_PARAM, SET_ADVANCED_SEARCH, SET_COLLAPSE_FILTER } from './types';
import { toggleLoader } from '@jsroot/actions/loaderAction';
import PlayerQueryService from '../lib/playerQueryService';
import { setSelectedPlayer } from './commonAction';
import { setPlayerList, setPagingOption, setIsFetchingData } from './gridHandlerAction';
import { defaultPagingOption } from '../lib/constants.js';
import { buildSelectedPlayer } from '../lib/utils';
import PlayerSuggestionService from '../lib/playerSuggestionService';

export const searchPlayer = (param) => (dispatch) => {
    const service = new PlayerQueryService();

    dispatch(setPlayerList(null));
    dispatch(setSelectedPlayer(null));
    dispatch(setIsFetchingData(true));
    dispatch(setParam(param));
    dispatch(toggleLoader(true));
    service.getPlayerList(param).then(result => {
        const { playerList, totalItem } = result;
        dispatch(setPlayerList(playerList));
        dispatch(setIsFetchingData(false));

        const pagingOption = {
            ...defaultPagingOption,
            PageIndex: param.pageIndex,
            PageSize: param.pageSize,
            TotalItem: totalItem
        }
        dispatch(setPagingOption(pagingOption));

        if (playerList.length === 1) {
            const selectedPlayer = buildSelectedPlayer(playerList[0]);
            dispatch(setSelectedPlayer(selectedPlayer));
        }

        dispatch(toggleLoader(false));
    }).catch(() => {
        dispatch(toggleLoader(false));
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

export const getSuggestionList = (param) => () => {
    const suggestionService = new PlayerSuggestionService();

    return suggestionService.getSuggestionList(param);
}