import { shallowEqual, useSelector } from 'react-redux'
import { ALL_SELECTED_TEXT } from './../../../common/lib/constants'

export const useIsEnableLeague = () => {
    const [selectedProduct, selectedSport] = useSelector(state => 
        [state.selectedProduct, state.selectedSport]
        , shallowEqual)
        
    const isSingleSport = !!selectedSport && selectedSport !== ALL_SELECTED_TEXT && selectedSport.split(",").length === 1;
    return (selectedProduct === 'SB' || selectedProduct === 'BA') && isSingleSport;
}

export const useIsEnableMatch = () => {
    const [selectedLeague] = useSelector(state => 
        [state.selectedLeague, state.isEnableLeague]
        , shallowEqual)
    const isEnableLeague = useIsEnableLeague();
    const isSingleLeague = !!selectedLeague && selectedLeague !== ALL_SELECTED_TEXT && selectedLeague.split(",").length === 1;

    return isEnableLeague && isSingleLeague;
}