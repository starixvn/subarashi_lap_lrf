import * as types from './types'

export const setSelectedOddGroup = selectedOddGroup => {
    return {
        type: types.SET_SELECTED_ODDGROUP,
        data: selectedOddGroup
    }
}

