import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import Service from '../../common/Service.js'
import { useValidParam } from './useValidParam'
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import StringHelper from '@jsroot/lib/stringHelper.js';
import { ALL_SELECTED_TEXT, SortBy, SortOrder, SearchMode } from '../../common/constants.js'
import { useCallback } from 'react';
import {v4 as uuidv4} from 'uuid';

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {
        requestParam,
        username,
        selectedBaseCurrency,
        selectedProduct,
        selectedStatus,
        dateRange,
        selectedLiveStatus,
        selectedPlatform,
        selectedCurrency,
        selectedSport,
        selectedBettype,
        selectedSubsidiary,
        selectedOddsGroup,
        selectedCustomerClass,
        searchMode,
        sportList,
        bettypeList,
        selectedVipOnly,
        isGroupInOriginalCurrency,
        isExcludeTestData,
        isViewCashOutOnly,
        selectedGroupByOption,
        selectedBreakDownByOption,
         }
        = useSelector(state => state, shallowEqual);

    const { baseCurrencyList } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const { isSubsidiarySearch } = useSubsidiarySearch();

    const { setReportTitle, setRequestParam, toggleLoader, getReportData, setDateRange, setSelectedProduct, setSelectedCurrency,
        setSelectedPlatform, setSelectedStatus, setSelectedLiveStatus, setSelectedBaseCurrency, setSelectedVipOnly, setSelectedCustomerClass, setSelectedOddsGroup,
        setUsername, setSearchMode, setGroupInOriginalCurrency, setViewCashOutOnly, setExcludeTestData, setSelectedGroupByOption, setSelectedBreakDownByOption,
        setSubsidiarySearch, setSubsidiaryList, setAppUuid } = ActionCreators;

    const _buildTitle = (params) => {
        const { FromDate, ToDate, ProductCodes, SearchUserName, BaseCurrency, CurrencyIdList } = params;
        const {  currencyList } = AppData;
        const selectedCurrencyCode = Service.getCurrencyCodes(CurrencyIdList, currencyList);
        const seletedCurrencyText = selectedCurrencyCode == ALL_SELECTED_TEXT ? LangHelper.getSingleResource("All") : StringHelper.addSpaceAfterComma(selectedCurrency);
        const dateRangeText = `, ${Site.convertDateToString(FromDate)} → ${Site.convertDateToString(ToDate)}`;
        const currencyText =  `, ${LangHelper.getSingleResource("Currency")}: ${seletedCurrencyText}, ${LangHelper.getSingleResource("BaseCurrency")}: ${BaseCurrency}`;
        const productText = `, ${LangHelper.getSingleResource("LicenseeW_L")} (${ProductCodes})`;
        const userText = !!SearchUserName ? `, ${LangHelper.getSingleResource("Username")}: ${SearchUserName}` : "";

        return LangHelper.getSingleResource("WinlossAnalysis") + dateRangeText + currencyText + productText + userText;
    }
    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { fromDate, toDate } = dateRange;
        const { PageSize } = requestParam;
        const { oddsGroupList, riskLevelList, liveStatusList, statusList, platformList, currencyList } = AppData;
        const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency);
        const subsidiary = Site.getLrfSubsidiary();
        let { SubsidiarySearch, SubsidiaryList } = subsidiary;
        if (!subsidiary || Object.keys(subsidiary).length === 0){
            SubsidiarySearch = isSubsidiarySearch;
            SubsidiaryList = selectedSubsidiary;
        }

        const selectedCurrencyCode = Service.getCurrencyCodes(selectedCurrency, currencyList);
        const seletedCurrencyText = selectedCurrencyCode == ALL_SELECTED_TEXT ? LangHelper.getSingleResource("All") : StringHelper.addSpaceAfterComma(selectedCurrency);

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodes: selectedProduct,
            SearchUserName: username,
            SearchMode: searchMode,
            CurrencyIdList: selectedCurrency,
            CurrencyCodes: seletedCurrencyText,
            BaseCurrency: selectedBaseCurrency,
            StatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedStatus, statusList),
            SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
            BetTypeIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedBettype, bettypeList),
            PlatformIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedPlatform, platformList),
            LiveStatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedLiveStatus, liveStatusList),
            IsVipOnly: selectedVipOnly,
            CustomerClass: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedCustomerClass, riskLevelList, r => r.customerClassList),
            OddsGroup: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedOddsGroup, oddsGroupList),
            IsShowInOrginalCurrency: isGroupInOriginalCurrency,
            IsExcludedTestData: isExcludeTestData,
            IsViewCashOutOnly: isViewCashOutOnly,
            GroupMode: selectedGroupByOption,
            BreakdownMode: selectedBreakDownByOption,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            SortBy: SortBy.Default,
            SortOrder: SortOrder.ASC,
            SubsidiaryList,
            SubsidiarySearch,
            SubmitTime: new Date().getTime()
        }
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = _buildTitle(params);
        batch(() => {
            dispatch(setReportTitle(title));
            dispatch(setRequestParam(params));
            dispatch(toggleLoader(true));
            dispatch(getReportData(params));
        })
    }

    const onClickClearFilter = useCallback(() =>  {
        let defaultState = window.initialState;
        batch(() => {
            dispatch(setDateRange({ startDate: defaultState.dateRange.fromDate, endDate: defaultState.dateRange.toDate }));
            dispatch(setSelectedProduct(defaultState.selectedProduct));
            dispatch(setSelectedCurrency(defaultState.selectedCurrency));
            dispatch(setSelectedPlatform(defaultState.selectedPlatform));
            dispatch(setSelectedStatus(defaultState.selectedStatus));
            dispatch(setSelectedLiveStatus(defaultState.selectedLiveStatus));
            dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));
            dispatch(setSelectedVipOnly(defaultState.selectedVipOnly));
            dispatch(setSelectedCustomerClass(defaultState.selectedCustomerClass));
            dispatch(setSelectedOddsGroup(defaultState.selectedOddsGroup));
            dispatch(setUsername(''));
            dispatch(setSearchMode(SearchMode.MatchPrecise));
            dispatch(setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency));
            dispatch(setViewCashOutOnly(defaultState.isViewCashOutOnly));
            dispatch(setExcludeTestData(defaultState.isExcludeTestData));
            dispatch(setSelectedGroupByOption(defaultState.selectedGroupByOption));
            dispatch(setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption));
            dispatch(setSubsidiarySearch(false));
            dispatch(setSubsidiaryList(""));
            dispatch(setAppUuid(`${uuidv4()}`));
        })

    });


    return { submit, onClickClearFilter };
}

export default useFilterAction;