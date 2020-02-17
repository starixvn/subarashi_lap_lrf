import * as types from './types';
import { toggleLoader } from '@jsroot/actions/loaderAction';

export const searchPlayer = (params) =>  (dispatch) => {
        dispatch(toggleLoader(true));
       setTimeout(() => {
        new Promise(resolve => {
            resolve([]);
        }).then(_ => {
            dispatch(toggleLoader(false));
            dispatch(setPlayerList(_));
        }).catch(error =>  {
            dispatch(toggleLoader(false));
            throw error;
        })
       }, 3000)
        
}


export const setPlayerList = data => {
    return {
        type: types.SET_PLAYER_LIST,
        data
    }
}