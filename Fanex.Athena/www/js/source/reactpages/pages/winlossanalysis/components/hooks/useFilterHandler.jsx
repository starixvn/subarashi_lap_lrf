import { batch, useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import AppData from '@jsroot/lib/AppData'
import LangHelper from '@jsroot/lib/langHelper'
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import Service from '../../common/Service'
import { useCallback } from 'react'
import { ProductCode, CashOutMode, ViewInTimeMode } from '../../common/constants.js'

export const useFilterHandler = () => {
    const dispatch = useDispatch();
    const { defaultSelectedSubsidiary } = useSubsidiarySearch();

    const { setUsername, setSubsidiaryList, setSelectedStatus, setSelectedProduct, getSportList,
        getBetTypeList, setSelectedSport, setSelectedBettype, setDateRange, setSelectedCashOutMode,
        setSelectedLiveStatus, setSelectedCustomerClass, setSelectedOddsGroup, setSelectedPlatform,
        setSelectedCurrency, setSelectedBaseCurrency, changeIsConvertAll, setSubsidiarySearch,
        setSelectedVipOnly, setSearchMode, setGroupInOriginalCurrency, setExcludeTestData, setProductList,
        setSelectedViewInTime, setHour, setSelectedGroupByOption, setSelectedBreakDownByOption }
        = ActionCreators;

    const onUserNameInputHandler = useCallback((value) => dispatch(setUsername(value)), []);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)), []);

    const onDateRangeChangeHandler = useCallback((date, isValidMonthRange = true, limitedMonthRange) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", limitedMonthRange);
            alert(message);
        }
    }, [])

    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)), []);

    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)), []);

    const onProductChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProduct(selectedItemsKey));
            if (!Service.isContainProductSportBookOrBa(selectedItemsKey)) {
                dispatch(setSelectedCashOutMode(0));
            }
            dispatch(getSportList(selectedItemsKey));
            dispatch(getBetTypeList(selectedItemsKey));
        })

    }, [])

    const onSportChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedSport(selectedItemsKey)), [])

    const onBetTypeChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey)), []);

    const onRiskLevelChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        const customerClass = AppData.riskLevelList.filter(r => selectedItemsKey.includes(r.id)).map(r => r.customerClassList).join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    }, [])

    const onOddsGroupChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)), []);

    const onPlatformChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)), []);

    const onCurrencyChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)), []);

    const onBaseCurrencyChangeHandler = useCallback((item) => dispatch(setSelectedBaseCurrency(item.value)), []);

    const onConverAllChangeHandler = useCallback((checked) => dispatch(changeIsConvertAll(checked)), []);

    const onVipOnlyChangeHandler = useCallback((item) => dispatch(setSelectedVipOnly(item.value)), [])

    const onGroupInOriginalCurrencyChangeHandler = useCallback(checked => dispatch(setGroupInOriginalCurrency(checked)), []);

    const onExcludeTextDataChangeHandler = useCallback((checked) => dispatch(setExcludeTestData(checked)), [])

    const onCashOutModeChangeHandler = useCallback((item, viewInTime) => {
        batch(() => {
            if (item.value === CashOutMode.ViewCOOnly) {

                var productListOrg = viewInTime == ViewInTimeMode.Settlement ? AppData.settlementTimeProductList : AppData.productList;

                const selectedProduct = productListOrg.filter(product => product.id == ProductCode.BA || product.id == ProductCode.SportsBook)
                    .map(product => product.id)
                    .join(',');
                const productList = productListOrg.map(product => product.id == ProductCode.SportsBook || product.id == ProductCode.BA ? product : { ...product, status: false });
                onProductChangeHandler(null, selectedProduct);
                dispatch(setProductList(productList));

            }
            dispatch(setSelectedCashOutMode(item.value));
        })
    }, [])

    const onSearchModeChangeHandler = useCallback((event) => {
        const { value } = event.target;
        dispatch(setSearchMode(value));
    }, [])

    const onSubsidiaryCheckBoxChangeHandler = useCallback(checked => {
        dispatch(setSubsidiarySearch(checked));
        checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary))
    }, [])

    const onViewInTimeChangeHandler = useCallback((event) => {
        const value = +event.target.value;
        const defaultState = window.initialState;

        if (value == ViewInTimeMode.Settlement) {
            const productList = AppData.settlementTimeProductList;
            const selectedProduct = productList.map(product => product.id).join(',');

            onProductChangeHandler(null, selectedProduct);
            dispatch(setProductList(productList));
        }
        else {
            onProductChangeHandler(null, defaultState.selectedProduct);
            dispatch(setProductList(AppData.productList));
        }

        dispatch(setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency));
        dispatch(setSelectedGroupByOption(defaultState.selectedGroupByOption));
        dispatch(setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption));
        dispatch(setDateRange({ startDate: defaultState.dateRange.fromDate, endDate: defaultState.dateRange.toDate }));
        dispatch(setSelectedCashOutMode(defaultState.selectedCashOutMode));
        dispatch(setHour(defaultState.selectedHour));
        dispatch(setSelectedViewInTime(value));
    }, []);

    const onHourChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setHour(selectedItemsKey)), []);

    return {
        onUserNameInputHandler, onSubsidiaryDropDownChangeHandler, onStatusChangeHandler, onProductChangeHandler,
        onSportChangeHandler, onBetTypeChangeHandler, onLiveStatusChangeHandler, onDateRangeChangeHandler,
        onRiskLevelChangeHandler, onOddsGroupChangeHandler, onPlatformChangeHandler, onVipOnlyChangeHandler,
        onCurrencyChangeHandler, onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryCheckBoxChangeHandler,
        onSearchModeChangeHandler, onGroupInOriginalCurrencyChangeHandler, onExcludeTextDataChangeHandler, onCashOutModeChangeHandler,
        onViewInTimeChangeHandler, onHourChangeHandler
    }
}