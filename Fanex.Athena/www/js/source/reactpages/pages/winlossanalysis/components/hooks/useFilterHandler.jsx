import { batch, useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import AppData from '@jsroot/lib/AppData'
import LangHelper from '@jsroot/lib/langHelper'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import Service from '../../common/Service'
import { useCallback } from 'react'

export const useFilterHandler = () =>{
    const dispatch = useDispatch();
    const {defaultSelectedSubsidiary} = useSubsidiarySearch();

    const {setUsername, setSubsidiaryList, setSelectedStatus, setSelectedProduct, getSportList, 
        getBetTypeList, setSelectedSport, setSelectedBettype, setDateRange, setViewCashOutOnly,
        setSelectedLiveStatus, setSelectedCustomerClass, setSelectedOddsGroup, setSelectedPlatform,
        setSelectedCurrency, setSelectedBaseCurrency, changeIsConvertAll, setSubsidiarySearch,
        setSelectedVipOnly, setSearchMode, setGroupInOriginalCurrency, setExcludeTestData} 
        = ActionCreators;

    const onUserNameInputHandler = useCallback((value) => dispatch(setUsername(value)), []);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)), []);

    const onDateRangeChangeHandler = useCallback((date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }, [])
   
    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)), []);
   
    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)), []);
    
    const onProductChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProduct(selectedItemsKey));
            if (!Service.isContainProductSportBookOrBa(selectedItemsKey)){
                dispatch(setViewCashOutOnly(false));
            }
            dispatch(getSportList(selectedItemsKey));
            dispatch(getBetTypeList(selectedItemsKey));
        })

    }, [])
    
    const onSportChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedSport(selectedItemsKey)), [])

    const onBetTypeChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey)),[]);
    
    const onRiskLevelChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        const customerClass = AppData.riskLevelList.filter( r => selectedItemsKey.includes(r.id)).map( r => r.customerClassList).join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    },[])

    const onOddsGroupChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)),[]);
    
    const onPlatformChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)),[]);
    
    const onCurrencyChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)),[]);
    
    const onBaseCurrencyChangeHandler = useCallback((item) => dispatch(setSelectedBaseCurrency(item.value)),[]);
    
    const onConverAllChangeHandler = useCallback((checked) => dispatch(changeIsConvertAll(checked)),[]);

    const onVipOnlyChangeHandler = useCallback((item) => dispatch(setSelectedVipOnly(item.value)),[])

    const onGroupInOriginalCurrencyChangeHandler = useCallback(checked => dispatch(setGroupInOriginalCurrency(checked)),[]);

    const onExcludeTextDataChangeHandler = useCallback((checked) => dispatch(setExcludeTestData(checked)),[])

    const onCashOutOnlyChangeHandler = useCallback((checked) => dispatch(setViewCashOutOnly(checked)),[])

    const onSearchModeChangeHandler = useCallback((event) => {
        const { value } = event.target;
        dispatch(setSearchMode(value));
    },[])
    
    const onSubsidiaryCheckBoxChangeHandler = useCallback(checked => { 
        dispatch(setSubsidiarySearch(checked)); 
        checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary))
    },[])

    return {onUserNameInputHandler, onSubsidiaryDropDownChangeHandler, onStatusChangeHandler, onProductChangeHandler,
        onSportChangeHandler, onBetTypeChangeHandler, onLiveStatusChangeHandler, onDateRangeChangeHandler,
        onRiskLevelChangeHandler, onOddsGroupChangeHandler, onPlatformChangeHandler, onVipOnlyChangeHandler,
        onCurrencyChangeHandler, onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryCheckBoxChangeHandler,
        onSearchModeChangeHandler, onGroupInOriginalCurrencyChangeHandler, onExcludeTextDataChangeHandler, onCashOutOnlyChangeHandler}
}