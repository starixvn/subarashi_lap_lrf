import { shallowEqual, useSelector } from 'react-redux'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'

export const useValidParam = () => {
    const [selectedProduct, selectedStatus, selectedCurrency, selectedBaseCurrency, selectedSubsidiary] = useSelector(state => 
        [state.selectedProduct, state.selectedStatus, state.selectedCurrency, state.selectedBaseCurrency, state.selectedSubsidiary]
        , shallowEqual)
    const { isSubsidiarySearch } = useSubsidiarySearch();

    return !!selectedProduct
    && !!selectedStatus
    && !!selectedCurrency
    && validateBaseCurrency(selectedBaseCurrency)            
    && (!isSubsidiarySearch || selectedSubsidiary);
}