import * as types from './types.js'

export const setSelectedCustomerClass = (value) => {
    return {
        type: types.SET_CUSTOMER_CLASS,
        data: value
    }
}