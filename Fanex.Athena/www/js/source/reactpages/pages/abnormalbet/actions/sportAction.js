import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import * as types from './types.js'

const Url = Site.resolveClientUrl('api/CommonDataApi/GetSports');

 const setSelectedSport = (sportId) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: sportId
    };
}

const setSportList = (list) => {
    return {
        type: types.SET_SPORT_LIST,
        data: list
    };
}

const getSportList = (productCode, date) => {
    return (dispatch) => {
        DataService.getData(Url, { productCode: productCode, includeSabaSport : true})
            .then(response => {
                let data = response.data;
                
                var sportList = data.map(item => item.value).join(',');
                dispatch(setSportList(data));
                dispatch(setSelectedSport(sportList));
            });
    };
}

export default {
    getSportList,
    setSportList,
    setSelectedSport
}
