import DataService from '@jsroot/lib/DataService.js'
import Service from './../../common/lib/Service'
import Site from '@jsroot/lib/site'
import Cache from '@jsroot/lib/Cache'
import AppData from '@jsroot/lib/AppData'
import * as types from './types'
import { ALL_SELECTED_TEXT } from './../../common/lib/constants'

const BETTYPE_CACHE_KEY = "BTC_SINGLEPLAYER_BETTYPE_CACHE_KEY";
const Url = Site.resolveClientUrl('api/CommonDataApi/GetBetTypeInTreeList');

let currentCancellationTokenSource = null;

const dispatchBettypeList = (dispatch, data) => {
    dispatch(setBettypeList(data));
    dispatch(setSelectedBettype(ALL_SELECTED_TEXT));
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
    return {
        type: types.SET_ORIGINAL_BETTYPE_LIST,
        data: list
    }
}

export const getBettypeList = (productCodes) => {
    const cacheKey = BETTYPE_CACHE_KEY + productCodes + AppData.licenseeName;
    return async (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchBettypeList(dispatch, [...cacheData]);
            return;
        }
        if (currentCancellationTokenSource) {
            currentCancellationTokenSource.cancel('Operation canceled by the user.');
        }
        currentCancellationTokenSource = DataService.genCancellationToken();
        try {
            const response = await DataService.getData(Url, { productCodes: productCodes }, currentCancellationTokenSource)
            currentCancellationTokenSource = null;
            const data = response.data;
            Cache.set(cacheKey, data, 10);
            dispatchBettypeList(dispatch, data);
        }
        catch (e) {
            if (DataService.isCancel(e)) {
                return;
            } else {
                // handle error
            }
        }
    }
}