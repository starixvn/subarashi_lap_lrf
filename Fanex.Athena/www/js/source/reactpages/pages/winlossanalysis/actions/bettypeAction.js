import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import Service from '../common/Service'
import * as types from './types'
import Cache from '@jsroot/lib/Cache'
import AppData from '@jsroot/lib/AppData' 

const BETTYPE_CACHE_KEY = "WINLOSSANALYSIS_BETTYPE_CACHE_KEY";
const Url = Site.resolveClientUrl('api/CommonDataApi/GetBetTypeInTreeList');

let currentCancellationTokenSource = null;

const dispatchBettypeList = (dispatch, data) => {
    let selectedSports = Service.getSelectedItemFromTreeListItem(data);          
    dispatch(setBettypeList(data));
    dispatch(setSelectedBettype(selectedSports));
}

export const setSelectedBettype = (betTypeIds) => {
    return {
        type: types.SET_SELECTED_BETTYPE,
        data: betTypeIds
    };
}

export const setBettypeList = (list) => {
    return {
        type: types.SET_BETTYPE_LIST,
        data: list
    };
}

export const setOrginalBetTypeList = (list) => {
    return{
        type: types.SET_ORIGINAL_BETTYPE_LIST,
        data: list
    }
}

export const getBetTypeList = (productCodes) => {
    const cacheKey = BETTYPE_CACHE_KEY + productCodes + AppData.licenseeName;
    return (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if(cacheData)
        {
            dispatchBettypeList(dispatch, cacheData);
            return;
        }
        if(currentCancellationTokenSource){
            currentCancellationTokenSource.cancel('Operation canceled by the user.');
        }
        currentCancellationTokenSource = DataService.genCancellationToken();
        DataService.getData(Url, { productCodes: productCodes}, currentCancellationTokenSource)
            .then(response => {
                currentCancellationTokenSource = null;    
                let data = response.data;
                Cache.set(cacheKey, data, 10);
                dispatchBettypeList(dispatch, data);
            })
            .catch(function (thrown) {
                if (DataService.isCancel(thrown)) {
                    return;
                } else {
                  // handle error
                }
              });
    };
}
