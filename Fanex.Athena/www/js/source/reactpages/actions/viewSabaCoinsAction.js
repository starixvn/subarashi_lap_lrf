import * as types from './types'

export const changeViewSabaCoins = (checked) => {
    return {
        type: types.CHANGE_VIEW_SABA_COINS,
        data: checked
    }
}