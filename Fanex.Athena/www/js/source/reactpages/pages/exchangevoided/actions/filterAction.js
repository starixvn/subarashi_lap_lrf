import * as types from './types.js'

export const setSelectedTimeZone = (value) => {
    return {
        type: types.TIME_ZONE,
        data: value
    }
}

export const setSelectedExchangeMode = (value) =>{
    return{
        type: types.EXCHANGE_MODE,
        data: value
    }
}