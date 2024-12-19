import DataService from '@jsroot/lib/DataService.js'
import Service from './../../common/lib/Service'
import { getLeagueList } from './leagueAction'
import Site from '@jsroot/lib/site'
import * as types from './types'

const Url = Site.resolveClientUrl('api/CommonDataApi/GetSportsForTreeView');
export const setSelectedSport = (sportId) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: sportId
    };
}

export const setSportList = (list) => {
    return {
        type: types.SET_SPORT_LIST,
        data: list
    };
}

export function getSportList(productCodes, date) {
    return async (dispatch) => {
        const response = await DataService.getData(Url, { productCodes: productCodes });
        const data = response.data;
        const selectedSports = Service.getSelectedItemFromTreeListItem(data);
        dispatch(setSportList(data));
        dispatch(setSelectedSport(selectedSports));
        if (date) {
            dispatch(getLeagueList(0, date));
        }
    };
}