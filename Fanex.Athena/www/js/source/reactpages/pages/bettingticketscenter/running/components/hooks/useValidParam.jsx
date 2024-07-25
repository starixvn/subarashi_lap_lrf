import { shallowEqual, useSelector } from 'react-redux'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import {useIsEnableLeague} from '../hooks/useIsEnableLeagueMatch'

export const useValidParam = () => {
    const [selectedProduct, selectedStatus, selectedCurrency, selectedBaseCurrency, selectedSubsidiary, selectedPlatform, selectedLiveStatus, selectedCustomerClass, selectedOddsGroup, selectedBettype, selectedSport, selectedLeague] = useSelector(state => 
        [state.selectedProduct, state.selectedStatus, state.selectedCurrency, state.selectedBaseCurrency, state.selectedSubsidiary, state.selectedPlatform, state.selectedLiveStatus, state.selectedCustomerClass, state.selectedOddsGroup, state.selectedBettype, state.selectedSport, state.selectedLeague]
        , shallowEqual)
    const { isSubsidiarySearch } = useSubsidiarySearch();
    const isEnableLeague = useIsEnableLeague();

    return !!selectedProduct
    && !!selectedStatus
    && !!selectedCurrency
    && !!selectedLiveStatus
    && !!selectedCustomerClass
    && !!selectedOddsGroup
    && !!selectedPlatform
    && !!selectedBettype 
    && !!selectedSport
    && validateBaseCurrency(selectedBaseCurrency)            
    && (!isSubsidiarySearch || selectedSubsidiary)
    && (!isEnableLeague || selectedLeague);
}