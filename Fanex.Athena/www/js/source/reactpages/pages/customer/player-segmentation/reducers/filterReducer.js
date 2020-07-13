
import createReducer from '@jsroot/lib/createReducer'
import { SET_SUBSIDIARY_LIST } from '../actions/types'

export const selectedSubsidiary = createReducer(null, {
    [SET_SUBSIDIARY_LIST](prevState, action) {
        return action.data;
    }
})