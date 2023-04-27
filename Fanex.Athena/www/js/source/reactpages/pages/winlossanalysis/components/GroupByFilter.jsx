import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast, Flip } from 'react-toastify';
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import { ActionCreators } from '../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import Service from '../common/Service'
import { DisplayGroupBreakDownMapping, SortBy, SortOrder } from '../common/constants'
import {v4 as uuidv4} from 'uuid';

const ToastMsg = () => (
    <div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg1")}</div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg2")}</div>
    </div>
)

export const GroupByFilter = (props) => {


    const _showExportWarning = () => {
        toast.success(<ToastMsg />);
    }

    const groupByList = useMemo(() => Service.buildGroupByOption(), [AppData.licenseeName])
    const breakDownList = useMemo(() => Service.buildBreakDownOptionFromGroupByMode(props.selectedGroupByOption), [props.selectedGroupByOption])

    const isValidModel = () => {
        return !!props.selectedProduct
            && !!props.selectedStatus
            && !!props.selectedLiveStatus
            && !!props.selectedCurrency
            && !!props.selectedBettype
            && !!props.selectedSport
            // && validateBaseCurrency(props.selectedBaseCurrency)
    }

    const buildTitle = (params) => {
        const { FromDate, ToDate, ProductCodes, SearchUserName, BaseCurrency, CurrencyIdList } = params;
        const {  currencyList } = AppData;
        const dateRangeText = `, ${Site.convertDateToString(FromDate)} → ${Site.convertDateToString(ToDate)}`;
        const selectedCurrency = Service.getCurrencyCodes(CurrencyIdList, currencyList);
        const currencyText =  `, ${LangHelper.getSingleResource("Currency")}: ${selectedCurrency}, ${LangHelper.getSingleResource("BaseCurrency")}: ${BaseCurrency}`;
        const productText = `, ${LangHelper.getSingleResource("LicenseeW_L")} (${ProductCodes})`;
        const userText = !!SearchUserName ? `, ${LangHelper.getSingleResource("Username")}: ${SearchUserName}` : "";

        return LangHelper.getSingleResource("WinlossAnalysis") + dateRangeText + currencyText + productText + userText;
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = buildTitle(params);
        props.setReportTitle(title);
        props.setRequestParam(params);
        props.toggleLoader(true);
        props.getReportData(params);
    }

    const _getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        const { PageSize } = props.requestParam;
        const baseCurrency = AppData.baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
        const { oddsGroupList, customerClassList, liveStatusList, statusList, platformList} = AppData;
        const subsidiary = Site.getLrfSubsidiary();
        let { SubsidiarySearch, SubsidiaryList } = subsidiary;
        if (!subsidiary || Object.keys(subsidiary).length === 0){
            SubsidiarySearch = props.subsidiarySearch;
            SubsidiaryList = props.selectedSubsidiary;
        }

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodes: props.selectedProduct,
            SearchUserName: props.username,
            SearchMode: props.searchMode,
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency,
            StatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(props.selectedStatus, statusList),
            SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(props.selectedSport, props.sportList),
            BetTypeIds: Service.getNormalizedSelectedParamValueForTreeListFilter(props.selectedBettype, props.bettypeList),
            PlatformIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(props.selectedPlatform, platformList),
            LiveStatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(props.selectedLiveStatus, liveStatusList),
            IsVipOnly: props.selectedVipOnly,
            CustomerClass: Service.getNormalizedSelectedParamValueForMultiSelectFilter(props.selectedCustomerClass, customerClassList),
            OddsGroup: Service.getNormalizedSelectedParamValueForMultiSelectFilter(props.selectedOddsGroup, oddsGroupList),
            IsShowInOrginalCurrency: props.isGroupInOriginalCurrency,
            IsExcludedTestData: props.isExcludeTestData,
            IsViewCashOutOnly: props.isViewCashOutOnly,
            GroupMode: props.selectedGroupByOption,
            BreakdownMode: props.selectedBreakDownByOption,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            SortBy: SortBy.Default,
            SortOrder: SortOrder.ASC,
            SubsidiaryList,
            SubsidiarySearch,
            SubmitTime: new Date().getTime()
        }
    }

    const _renderGroupByOption = () => {
        const { selectedGroupByOption } = props;

        return (
            <div className="form-group radio-group">
                <label className='label-text'>{LangHelper.getSingleResource('GroupBy')}:</label>
                {
                    groupByList.map((option, i) => {
                        const key = 'GroupBy' + i;
                        return (
                            <span key={`GroupBy${key}`}>
                                <input type='radio' value={option.value} checked={selectedGroupByOption == option.value} id={key}
                                    onChange={onChangeGroupByOption} />
                                <label htmlFor={key}>{option.label}</label>
                            </span>)
                    })
                }
            </div>
        );
    }

    const onChangeGroupByOption = (event) => {
        const groupMode = event.target.value
        const breakDownOption = Service.buildBreakDownOptionFromGroupByMode(groupMode);
        const firstEnabledSelectBreakDown = breakDownOption.find((item => !item.isDisabled));
        props.setSelectedGroupByOption(groupMode);
        props.setSelectedBreakDownByOption(firstEnabledSelectBreakDown.value);
        setValueForIsDisplayInOriginalCurrencyFilter(groupMode, firstEnabledSelectBreakDown.value);
    }

    const _renderBreakByOption = () => {
        const { selectedBreakDownByOption } = props;

        return (
            <div className="form-group radio-group">
                <label className='label-text'>{LangHelper.getSingleResource('BreakdownBy')}:</label>
                {
                    breakDownList.map((option, i) => {
                        const key = 'BreakBy' + i;
                        return (
                            <span key={`BreakBy${key}`}>
                                <input disabled={option.isDisabled} type='radio' value={option.value} checked={selectedBreakDownByOption == option.value} id={key}
                                    onChange={onChangeBreakByOption} />
                                <label htmlFor={key}>{option.label}</label>
                            </span>)
                    })
                }
            </div>
        );
    }

    const onChangeBreakByOption = (event) => {
        const mode = event.target.value;
        props.setSelectedBreakDownByOption(mode)
        setValueForIsDisplayInOriginalCurrencyFilter(props.selectedGroupByOption, mode);
    }

    const setValueForIsDisplayInOriginalCurrencyFilter = (groupByMode, breakdownByMode) => {
        const currentMapping = DisplayGroupBreakDownMapping.find(item => item.groupByMode == groupByMode
            && item.breakdownMode == breakdownByMode);
        if (!currentMapping.isDisplayBreakDownInCurrency) {
            props.setGroupInOriginalCurrency(currentMapping.isDisplayBreakDownInCurrency);
        }
    }

    const onClickClearFilter = () => {
        let defaultState = window.initialState;
        props.setDateRange({ startDate: defaultState.dateRange.fromDate, endDate: defaultState.dateRange.toDate });
        props.setSelectedProduct(defaultState.selectedProduct);
        props.setSelectedCurrency(defaultState.selectedCurrency);
        props.setSelectedPlatform(defaultState.selectedPlatform);
        props.setSelectedStatus(defaultState.selectedStatus);
        props.setSelectedLiveStatus(defaultState.selectedLiveStatus);
        props.setSelectedBaseCurrency(defaultState.selectedBaseCurrency);
        props.setSelectedVipOnly(defaultState.selectedVipOnly);
        props.setSelectedCustomerClass(defaultState.selectedCustomerClass);
        props.setSelectedOddsGroup(defaultState.selectedOddsGroup);
        props.setUsername('');
        props.setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency);
        props.setViewCashOutOnly(defaultState.isViewCashOutOnly);
        props.setExcludeTestData(defaultState.isExcludeTestData);
        props.setSelectedGroupByOption(defaultState.selectedGroupByOption);
        props.setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption);
        props.setSubsidiarySearch(false);
        props.setSubsidiaryList("");
        props.setAppUuid(`${uuidv4()}`);
    }

    return (
        <CollapsiblePanel className="page-filter" isCollapseMode={false}>
            <div className="row flex w100">
                <ToastContainer
                    autoClose={10000}
                    pauseOnFocusLoss={false}
                    style={{ width: "500px" }}
                    transition={Flip} />
                <div className=''>
                    <div className='flex flex-col'>
                        <div className='col-md-12 '>
                            {_renderGroupByOption()}
                        </div>
                        <div className='col-md-12'>
                            {_renderBreakByOption()}
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel()} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClickClearFilter}>{LangHelper.getSingleResource("ClearAllFilters")}</button>
                        </div>
                    </div>
                </div>

            </div>
        </CollapsiblePanel>
    )

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedGroupByOption, selectedBreakDownByOption, selectedPlatform,
        currencyList, selectedCurrency, baseCurrencyList,  selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, isGroupInOriginalCurrency, userGuideContent, ip, selectedSubsidiary,
        selectedVipOnly, selectedCustomerClass, selectedOddsGroup, isExcludeTestData, isViewCashOutOnly, subsidiarySearch, searchMode
    } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedGroupByOption, selectedBreakDownByOption, selectedPlatform,
        currencyList, selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, isGroupInOriginalCurrency, userGuideContent, ip, selectedSubsidiary,
        selectedVipOnly, selectedCustomerClass, selectedOddsGroup, isExcludeTestData, isViewCashOutOnly, subsidiarySearch, searchMode
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupByFilter);