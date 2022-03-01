
import createReducer from '@jsroot/lib/createReducer'
import { SET_CONTACT_LIST, SET_MODIFICATION_ACTION } from '../actions/types.js'

export const contactList = createReducer(null, {
    [SET_CONTACT_LIST](prevState, action) {
        return action.data;
    }
})

export const currentModificationAction = createReducer(null, {
    [SET_MODIFICATION_ACTION](prevState, action) {
        return action.data;
    }
})
