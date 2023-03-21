import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import Service from '../common/lib/Service'
import { getBetTypeList } from './bettypeAction';
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

export function getSportList(productCodes) {
    return (dispatch) => {
        DataService.getData(Url, { productCodes: productCodes})
            .then(response => {
                let data = response.data;    
                let selectedSports = Service.getSelectedItemFromTreeListItem(data);          
                dispatch(setSportList(data));
                dispatch(setSelectedSport(selectedSports));
            });
    };
}