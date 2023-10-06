import { shallowEqual, useSelector } from 'react-redux'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'
import { SearchingIdOptions } from '../../lib/constants'

export const useValidParam = () => {
    const {searchingId, selectedBaseCurrency, username, searchingIdOption} = useSelector(state => state, shallowEqual)
    return searchingId 
    && validateBaseCurrency(selectedBaseCurrency) 
    && (username || searchingIdOption === SearchingIdOptions.refNo);
}