import * as types from './types';
import { toggleLoader } from '@jsroot/actions/loaderAction';
import DataService from '@jsroot/lib/DataService';

export const searchPlayer = (params, afterSuccess) => async  (dispatch) => {
    const response = await DataService.postData('api/PlayerSegmentation/GetProblemPlayerList', params);
    response.isSuccess && afterSuccess && afterSuccess(response);
    dispatch(setPlayerList(response.data));
    dispatch(toggleLoader(false));
}


export const setPlayerList = data => {
    return {
        type: types.SET_PLAYER_LIST,
        data
    }
}