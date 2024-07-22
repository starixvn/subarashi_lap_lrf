import moment from 'moment'
import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import Cache from '@jsroot/lib/Cache'
import * as types from './types'

const Url = Site.resolveClientUrl('api/CommonDataApi/GetLeagues');
const LEAGUE_CACHE_KEY = "LEAGUE_CACHE_KEY";

export const setSelectedLeague = (leagueid) => {
    return {
        type: types.SET_SELECTED_LEAGUE,
        data: leagueid
    };
}

function dispatchLeagueList(dispatch, data) {
    dispatch(setLeagueList(data));
    dispatch(setSelectedLeague(data.map(l=>l.Id).toString()));
}

export const setLeagueList = (list) => {
    return {
        type: types.SET_LEAGUE_LIST,
        data: list
    };
}

export function getLeagueList(sportId) {
    var dateString = moment().format("YYYY-MM-DD");

    const cacheKey = LEAGUE_CACHE_KEY + sportId + "_" + dateString
    return (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchLeagueList(dispatch, cacheData);
            return;
        }

        DataService.getData(Url, { sportId: sportId, fromDate: dateString, toDate: dateString })
            .then(response => {
                var data = response.data.map(l => ({ 
                    Id : l.value,
                    Value : l.label, 
                    Status : true }));
                Cache.set(cacheKey, data);
                dispatchLeagueList(dispatch, data);
            });
    };
}

export const setEnableMatch = (value) => {
    return {
        type: types.SET_ENABLE_MATCH,
        data: value
    };
}