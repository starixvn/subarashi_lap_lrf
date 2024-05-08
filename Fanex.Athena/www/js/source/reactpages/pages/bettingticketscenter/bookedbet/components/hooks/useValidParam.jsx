import { shallowEqual, useSelector } from 'react-redux'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'
import {SearchingIdOptions } from '../../lib/constants'

export const useValidParam = () => {
    const [ selectedStatus, selectedBaseCurrency, selectedPlatform, selectedCurrency, searchingIdOption, searchingId, selectedSubsidiary] = useSelector(state => 
        [state.selectedStatus, state.selectedBaseCurrency, state.selectedPlatform, state.selectedCurrency, state.searchingIdOption, state.searchingId, state.selectedSubsidiary]
        , shallowEqual)

    const isBookedIDOrRefNoSearch = searchingIdOption === SearchingIdOptions.bookedId || searchingIdOption === SearchingIdOptions.refNo;

    return ((isBookedIDOrRefNoSearch && !!searchingId) || (!!selectedPlatform && !!selectedCurrency && !!searchingIdOption && !!searchingId
    && !!selectedStatus)) && validateBaseCurrency(selectedBaseCurrency);
}