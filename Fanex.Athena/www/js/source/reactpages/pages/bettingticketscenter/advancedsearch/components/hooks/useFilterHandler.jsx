import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import useIsEnableLeagueMatch from './useIsEnableLeagueMatch'
import Service from '../../../common/lib/Service'
import AppData from '@jsroot/lib/AppData'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import { useCallback } from 'react'
import { CashOutMode, ProductCode, ALL_SELECTED_TEXT } from './../../../common/lib/constants'

export const useFilterHandler = () =>{
    const dispatch = useDispatch();
    const [dateRange, selectedSport] = useSelector(state => [state.dateRange, state.selectedSport], shallowEqual);
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const {defaultSelectedSubsidiary} = useSubsidiarySearch();

    const {setUsername, setSubsidiaryList, setSelectedStatus, setSelectedProduct, getSportList, 
        getBettypeList, setSelectedSport, getLeagueList, setSelectedBettype, setSelectedLeague, getMatchList,
        setSelectedMatch, setSelectedLiveStatus, setSelectedCustomerClass, setSelectedOddsGroup, setSelectedPlatform,
        setIp, setSelectedCurrency, setSelectedBaseCurrency, changeIsConvertAll, setSubsidiarySearch, setEnableCashOutFilter, 
        setSelectedCashOutMode, setProductList} 
        = ActionCreators;

    const onUserNameInputHandler = useCallback((value) => dispatch(setUsername(value)),[]);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)),[]);
   
    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)),[]);
   
    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)),[]);
    
    const onProductChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        dispatch(setSelectedProduct(selectedItemsKey));
        getSportAndBettypeListByProduct(selectedItemsKey);
        updateCashOutMode(selectedItemsKey);
    },[])

    const getSportAndBettypeListByProduct = (selectedProduct) => {
        dispatch(getSportList(selectedProduct, dateRange.fromDate));
        dispatch(getBettypeList(selectedProduct));
    }

    const updateCashOutMode = (selectedProduct) => {
        const isEnableCashOutFilter = Service.isContainProductSportBookOrBa(selectedProduct);
        if (!isEnableCashOutFilter) {
            dispatch(setSelectedCashOutMode(0));
        }
        dispatch(setEnableCashOutFilter(isEnableCashOutFilter));
    }
    
    const onSportChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        dispatch(setSelectedSport(selectedItemsKey));
        if (isEnableLeagueMatch) {
            dispatch(getLeagueList(selectedItemsKey, dateRange.fromDate));
        }
    },[dateRange, isEnableLeagueMatch])

    const onBetTypeChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey)),[]);

    const onLeagueChangeHandler = useCallback((item) => {
        const leagueId = item.value;
        dispatch(setSelectedLeague(leagueId));
        if (Service.isSingleDate(dateRange)) {
            dispatch(getMatchList(selectedSport, leagueId, dateRange.fromDate));
        }
    },[dateRange, selectedSport])

    const onMatchChangeHandler = useCallback((item) => dispatch(setSelectedMatch(item.value)),[]);
    
    const onCustomerClassChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        let customerClass = selectedItemsKey;

        if(customerClass !== ALL_SELECTED_TEXT) {
            customerClass = AppData.riskLevels.filter( r => selectedItemsKey.includes(r.id)).map( r => r.customerClassList).join(',');
        }
        
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

    const onCashOutModeChangeHandler = useCallback((item) => {
        if (item.value === CashOutMode.ViewCOOnly) {
            const selectedProduct = AppData.productList.filter(product => product.id == ProductCode.BA || product.id == ProductCode.SportsBook)
                .map(product => product.id)
                .join(',');
            const productList = AppData.productList.map(product => product.id == ProductCode.SportsBook || product.id == ProductCode.BA ? product : { ...product, status: false });
            dispatch(setSelectedProduct(selectedProduct));
            dispatch(setProductList(productList));
        }
        dispatch(setSelectedCashOutMode(item.value));
    },[]);

    return {onUserNameInputHandler, onSubsidiaryDropDownChangeHandler, onStatusChangeHandler, onProductChangeHandler,
        onSportChangeHandler, onBetTypeChangeHandler, onLeagueChangeHandler, onMatchChangeHandler, onLiveStatusChangeHandler,
        onCustomerClassChangeHandler, onOddsGroupChangeHandler, onPlatformChangeHandler, onIpChangeHandler,
        onCurrencyChangeHandler, onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryCheckBoxChangeHandler,
        onCashOutModeChangeHandler}
}