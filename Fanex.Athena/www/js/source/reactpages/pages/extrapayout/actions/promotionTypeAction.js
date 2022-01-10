import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import * as types from './types.js'

const Url = Site.resolveClientUrl('ExtraPayoutReport/GetPromotionTypes');

 const setSelectedPromotionTypes = (data) => {
    return {
        type: types.SET_SELECTED_PROMOTION_TYPES,
        data: data
    };
}

const setPromotionTypeList = (list) => {
    return {
        type: types.SET_PROMOTION_TYPE_LIST,
        data: list
    };
}

const getPromotionTypeList = (productCode) => {
    return (dispatch) => {
        DataService.getData(Url, { productCode: productCode})
            .then(response => {
                let data = response.data;
                
                var promotionTypeList = data.map(item => item.value).join(',');
                dispatch(setPromotionTypeList(data));
                dispatch(setSelectedPromotionTypes(promotionTypeList));
            });
    };
}

export default {
    getPromotionTypeList,
    setPromotionTypeList,
    setSelectedPromotionTypes
}
