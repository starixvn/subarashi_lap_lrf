import { shallowEqual, useSelector } from 'react-redux'

export const useIsEnableLeague = () => {
    const [selectedProduct, selectedSport] = useSelector(state => 
        [state.selectedProduct, state.selectedSport]
        , shallowEqual)
        
    const isSingleSport = !!selectedSport && selectedSport.split(",").length === 1;
    return (selectedProduct === 'SB' || selectedProduct === 'BA') && isSingleSport;
}

export const useIsEnableMatch = () => {
    const [selectedLeague] = useSelector(state => 
        [state.selectedLeague, state.isEnableLeague]
        , shallowEqual)
    const isEnableLeague = useIsEnableLeague();
    const isSingleLeague = !!selectedLeague && selectedLeague.split(",").length === 1;

    return isEnableLeague && isSingleLeague;
}