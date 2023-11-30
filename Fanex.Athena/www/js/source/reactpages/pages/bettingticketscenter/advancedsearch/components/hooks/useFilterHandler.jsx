import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import useIsEnableLeagueMatch from './useIsEnableLeagueMatch'
import Service from '../../../common/lib/Service'
import AppData from '@jsroot/lib/AppData'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import { useCallback } from 'react'

export const useFilterHandler = () =>{
    const dispatch = useDispatch();
    const [dateRange, selectedSport] = useSelector(state => [state.dateRange, state.selectedSport], shallowEqual);
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const {defaultSelectedSubsidiary} = useSubsidiarySearch();

    const {setUsername, setSubsidiaryList, setSelectedStatus, setSelectedProduct, getSportList, 
        getBettypeList, setSelectedSport, getLeagueList, setSelectedBettype, setSelectedLeague, getMatchList,
        setSelectedMatch, setSelectedLiveStatus, setSelectedCustomerClass, setSelectedOddsGroup, setSelectedPlatform,
        setIp, setSelectedCurrency, setSelectedBaseCurrency, changeIsConvertAll, setSubsidiarySearch} 
        = ActionCreators;

    const onUserNameInputHandler = useCallback((value) => dispatch(setUsername(value)),[]);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)),[]);
   
    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)),[]);
   
    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)),[]);
    
    const onProductChangeHandler = useCallback((item) => {
        const productCode = item.value;
        dispatch(setSelectedProduct(productCode));
        dispatch(getSportList(productCode, Service.isSingleDate(dateRange) && dateRange.fromDate));
        dispatch(getBettypeList(productCode, Service.isSingleDate(dateRange)));
    },[dateRange])
    
    const onSportChangeHandler = useCallback((item) => {
        const sportId = item.value;
        dispatch(setSelectedSport(sportId));
        if (isEnableLeagueMatch) {
            dispatch(getLeagueList(sportId, dateRange.fromDate));
        }
    },[dateRange, isEnableLeagueMatch])

    const onBetTypeChangeHandler = useCallback((item) => dispatch(setSelectedBettype(item.value)),[]);

    const onLeagueChangeHandler = useCallback((item) => {
        const leagueId = item.value;
        dispatch(setSelectedLeague(leagueId));
        if (Service.isSingleDate(dateRange)) {
            dispatch(getMatchList(selectedSport, leagueId, dateRange.fromDate));
        }
    },[dateRange, selectedSport])

    const onMatchChangeHandler = useCallback((item) => dispatch(setSelectedMatch(item.value)),[]);
    
    const onCustomerClassChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        const customerClass = AppData.riskLevels.filter( r => selectedItemsKey.includes(r.id)).map( r => r.customerClassList).join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    },[])

    const onOddsGroupChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)),[]);
    
    const onPlatformChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)),[]);
    
    const onIpChangeHandler = useCallback((event) => dispatch(setIp(event.target.value)));
    
    const onCurrencyChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)),[]);
    
    const onBaseCurrencyChangeHandler = useCallback((item) => dispatch(setSelectedBaseCurrency(item.value)),[]);
    
    const onConverAllChangeHandler = useCallback((checked) => dispatch(changeIsConvertAll(checked)),[]);
    
    const onSubsidiaryCheckBoxChangeHandler = useCallback(checked => { 
        dispatch(setSubsidiarySearch(checked)); 
        checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary))
    },[])

    return {onUserNameInputHandler, onSubsidiaryDropDownChangeHandler, onStatusChangeHandler, onProductChangeHandler,
        onSportChangeHandler, onBetTypeChangeHandler, onLeagueChangeHandler, onMatchChangeHandler, onLiveStatusChangeHandler,
        onCustomerClassChangeHandler, onOddsGroupChangeHandler, onPlatformChangeHandler, onIpChangeHandler,
        onCurrencyChangeHandler, onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryCheckBoxChangeHandler}
}