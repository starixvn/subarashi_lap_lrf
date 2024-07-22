import { shallowEqual, useSelector } from 'react-redux'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'

export const useValidParam = () => {
    const [selectedProduct, selectedStatus, selectedBaseCurrency, username, selectedPlatform, selectedLiveStatus, selectedBettype, selectedSport] = useSelector(state => 
        [state.selectedProduct, state.selectedStatus, state.selectedBaseCurrency, state.username, state.selectedPlatform, state.selectedLiveStatus, 
            state.selectedBettype, state.selectedSport]
        , shallowEqual)

    return !!username && !!selectedProduct && !!selectedPlatform
    && !!selectedStatus && !!selectedLiveStatus
    && !!selectedBettype && !!selectedSport
    && validateBaseCurrency(selectedBaseCurrency);
}