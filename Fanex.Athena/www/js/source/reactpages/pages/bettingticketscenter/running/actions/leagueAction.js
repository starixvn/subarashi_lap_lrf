import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import Cache from '@jsroot/lib/Cache'
import * as types from './types'
import { ALL_SELECTED_TEXT } from './../../common/lib/constants'

const Url = Site.resolveClientUrl('api/RunningCommonDataApi/GetRunningLeagueList');
const LEAGUE_CACHE_KEY = "LEAGUE_CACHE_KEY";

export const setSelectedLeague = (leagueid) => {
    return {
        type: types.SET_SELECTED_LEAGUE,
        data: leagueid
    };
}

function dispatchLeagueList(dispatch, data) {
    dispatch(setLeagueList(data));
    dispatch(setSelectedLeague(ALL_SELECTED_TEXT));
    dispatch(setIsOutRightLeauge(false));
}

export const setLeagueList = (list) => {
    return {
        type: types.SET_LEAGUE_LIST,
        data: list
    };
}

export function getLeagueList(sportId) {
    const cacheKey = LEAGUE_CACHE_KEY + sportId
    return (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchLeagueList(dispatch, cacheData);
            return;
        }

        DataService.getData(Url, { sportId: sportId })
            .then(response => {
                var data = response.data;
                Cache.set(cacheKey, data);
                dispatchLeagueList(dispatch, data);
            });
    };
}

export const setIsOutRightLeauge = (value) => {
    return {
        type: types.SET_IS_OUTRIGHT,
        data: value
    };
}

export const setEnableMatch = (value) => {
    return {
        type: types.SET_ENABLE_MATCH,
        data: value
    };
}