import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { ToastContainer, toast, Flip } from 'react-toastify';

import Select from 'react-select'
import MultipleSelect from '@9softstudio/react-multiselect'
import { DateRange } from '@jsroot/components/date-range'
import AutoComplete from '@jsroot/components/auto-complete'
import CheckBox from '@jsroot/components/CheckBox'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import UserGuide from '@jsroot/components/UserGuide'

import { ActionCreators } from '../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'

import DataService from '@jsroot/lib/DataService.js'
import DataSourceHelper from '../../../lib/dataSourceHelper'
import { ApiUrl, BreakdownByMode } from '../common/lib/constants'
import { validateBaseCurrency } from '@jsroot/lib/validationHelper'

import { SubsidiaryViewType, TreeViewOption } from '../../../constants/report'
import { TreeViewSelect } from '@9softstudio/react-multiselect'

const ToastMsg = () => (
    <div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg1")}</div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg2")}</div>
    </div>
)

export class FormFilter extends Component {
    defaultSelectedSubsidiary = AppData.subsidiaryList.join(',');
    showSubsidiaryDropdown = AppData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT && AppData.subsidiaryList.length > 0;
    showSubsidiarySearchCheckBox = this.showSubsidiaryDropdown && AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT;
    whiteLabelView = AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT && !AppData.isOneworksMaster;

    constructor(props) {
        super(props);
        this.baseCurrencyList = AppData.baseCurrencyList;
        this.defaultBaseCurrency = props.selectedBaseCurrency;

        this.state = {
            subsidiarySearch : !this.showSubsidiarySearchCheckBox && this.showSubsidiaryDropdown,
            appData: Object.assign({}, AppData)
        };
    }

    componentDidMount() {
        this._onChangeProduct(null,this.props.selectedProduct);
    }

    _showExportWarning = () => {
        toast.success(<ToastMsg />);
    }

    get isValidModel() {
        return !!this.props.selectedProduct
            && !!this.props.selectedStatus
            && !!this.props.selectedLiveStatus
            && !!this.props.selectedCurrency
            && validateBaseCurrency(this.props.selectedBaseCurrency)
            && (!this.state.subsidiarySearch || !!this.props.selectedSubsidiary);
    }

    isSingleDate = (dateRange) => {
        const { fromDate, toDate } = dateRange || this.props.dateRange;
        return moment(fromDate, "MM/DD/YYYY", true).isSame(moment(toDate, "MM/DD/YYYY", true), 'day');
    }

    exportExcel = (event) => {
        event.preventDefault();

        const params = this._getParams();
        if (!params) {
            return;
        }

        if (AppData.isAllowTxIDColumn) {
            params.IsAllowTxIDColumn = true;
        }

        params.IsExport = true;
        this.props.toggleLoader(true);
        DataService.getFile(ApiUrl.ADVANCEDSEARCH_DATA_URL, params).then((response) => {
            toast.dismiss();
            const contentType = response.headers["content-type"];
            if (contentType && contentType.indexOf('application/json') > -1) {
                const RowsExceedLimitErrorCode = 1001;
                Site.readAsJson(response.data, (result) => {
                    if (result.ErrorCode === RowsExceedLimitErrorCode) {
                        this._showExportWarning();
                    }
                    else {
                        const msg = result.ErrorMsg || LangHelper.getSingleResource("ErrorProcessingMsg");
                        alert(msg);
                    }
                });
            } else {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource("NoInfo"));
                }
                else {
                    const fileName = "BettingTicketsCenter_AdvancedSearch." +
                        (response.headers["content-type"] === "application/zip" ? "zip" : "xls");

                    Site.downloadFile(response.data, fileName);
                }
            }

            this.props.toggleLoader(false);
        }).catch(error => {
            alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            this.props.toggleLoader(false);
        });
    }

    showUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            this.props.getUserGuideContent('BettingTicketCenterAdvancedSearch');
        }
    }

    _renderUserGuide() {
        const userGuideContent = this.props.userGuideContent;

        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={LangHelper.getSingleResource("WinlossAnalysis")}
            onClick={this.showUserGuide}
            content={userGuideContent} />)
    }

    _renderDateRange() {
        const dateRange = this.props.dateRange;
        const dateConstraint = AppData.dateConstraint;

        return (
            <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={this._onChangeDateRange} />
        )
    }

    _onChangeDateRange = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            this.props.setDateRange(date);
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    _renderProductSelectList() {
        const productList = this.state.appData.productList;

        return productList && productList.length && (
            <MultipleSelect id="ProductList"
                language={LangHelper.currentLanguage}
                value={this.props.selectedProduct}
                dataSource={productList}
                valueField={"label"}
                keyField={"value"}
                statusField={"Status"}
                onChange= {this._onChangeProduct} />
        );
    }

    _onChangeProduct = (currentItem, selectedItemsKey) => {
        this.props.setSelectedProduct(selectedItemsKey);
        this.props.getSportList(selectedItemsKey);
        this.props.getBetTypeList(selectedItemsKey);
    }

    _renderSportSelectList() {
        const sportList = this.props.sportList;
        if(!sportList || !sportList.length){
            return 'N/A';
        }

        return sportList && sportList.length && (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SportList"
                dataSource={sportList}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={(currentItem, selectedItemsKey, treeViewList) => this.props.setSelectedSport(selectedItemsKey)} />
        );
    }

    _renderBettypeSelectList() {
        const bettypeList = this.props.bettypeList;

        if(!bettypeList || !bettypeList.length){
            return 'N/A';
        }

        return bettypeList && bettypeList.length && (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="BetTypeList"
                dataSource={bettypeList}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={(currentItem, selectedItemsKey, treeViewList) => this.props.setSelectedBettype(selectedItemsKey)} />
        );
    }

    _renderPlatformSelectList() {
        const platformList = this.state.appData.platformList;

        return platformList && platformList.length && (
            <MultipleSelect id="PlatformList"
                language={LangHelper.currentLanguage}
                value={this.props.selectedPlatform}
                dataSource={platformList}
                valueField={"label"}
                keyField={"value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedPlatform(selectedItemsKey)} />
        );
    }

    _renderCurrencySelectList() {
        const currencyList = this.state.appData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => this._onChangeCurrency(selectedItemsKey)} />);
    }

    _onChangeCurrency = (currencyIdList) => {
        let baseCurrency = "";

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) { // none or multi currencies
            this.baseCurrencyList = this.state.appData.baseCurrencyList;
            baseCurrency = this.baseCurrencyList.find(x => x.label === this.props.selectedBaseCurrency) ?
                this.props.selectedBaseCurrency :
                this.defaultBaseCurrency;
        }
        else {
            const currencyName = this.state.appData.currencyList.find(x => x.Id == currencyIdList).Value;

            if (!this.baseCurrencyList.find(x => x.label === currencyName)) {
                baseCurrency = '';
                this.baseCurrencyList = AppData.baseCurrencyList.slice(0);
                this.baseCurrencyList.push({ value: baseCurrency, label: currencyName });
            }
            else {
                baseCurrency = currencyName;
            }
        }

        this.props.setSelectedCurrency(currencyIdList)
        this.props.setSelectedBaseCurrency(baseCurrency);
    }

    _renderBaseCurrencySelectList() {
        const baseCurrencyList = this.baseCurrencyList;

        return baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="ddlBased"
                value={this.props.selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => this.props.setSelectedBaseCurrency(item.value)} />
        );
    }

    _renderVipOnlySelectedList() {
        const vipOnlyList = this.state.appData.vipOnlyList;

        return vipOnlyList && vipOnlyList.length && (
            <Select instanceId="IsVipOnly"
                value={this.props.selectedVipOnly}
                options={vipOnlyList}
                onChange={(item) => this.props.setSelectedVipOnly(item.value)} />
        );
    }

    _renderStatusSelectList() {
        const statusList = this.state.appData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedStatus(selectedItemsKey)} />);
    }

    _renderLiveStatusSelectList() {
        const liveStatusList = this.state.appData.liveStatusList;

        return liveStatusList && liveStatusList.length && (
            <MultipleSelect id="LiveStatusList"
                language={LangHelper.currentLanguage}
                dataSource={liveStatusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedLiveStatus(selectedItemsKey)} />);
    }

    _renderCustomerClassSelectList() {
        const { selectedCustomerClass } = this.props;

        const customerClassList = this.state.appData.customerClassList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(customerClassList, selectedCustomerClass);

        return customerClassList && customerClassList.length && (
            <MultipleSelect id="ddlCustomerClass"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedCustomerClass(selectedItemsKey)} />);
    }

    _renderOddGroupSelectList() {
        const oddGroupList = AppData.oddGroupList;
        return oddGroupList && oddGroupList.length && (
            <MultipleSelect id="ddlOddGroup"
                language={LangHelper.currentLanguage}
                dataSource={oddGroupList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedOddsGroup(selectedItemsKey)} />);
    }

    _renderSubsidiaryTreeView() {
        return <TreeViewSelect
            language={LangHelper.currentLanguage}
            id="SubsidiaryTreeView"
            dataSource={AppData.whitelabelList}
            keyField="Value"
            valueField="Name"
            statusField="Checked"
            texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
            isAllTextShown={false}
            hasSearchBox={false}
            treeViewOption={TreeViewOption}
            onChange={(currentItem, selectedItemsKey, treeViewList) => this.props.setSubsidiaryList(selectedItemsKey)} />;
    }

    clearFilter = () => {
        let defaultState = window.initialState;
        this.props.setDateRange(defaultState.dateRange);
        this.props.setSelectedProduct(defaultState.selectedProduct);
        this.props.setSelectedCurrency(defaultState.selectedCurrency);
        this.props.setSelectedPlatform(defaultState.selectedPlatform);
        this.props.setSelectedStatus(defaultState.selectedStatus);
        this.props.setSelectedLiveStatus(defaultState.selectedLiveStatus);
        this.props.setSelectedBaseCurrency(defaultState.selectedBaseCurrency);
        this.props.setSelectedVipOnly(defaultState.selectedVipOnly);
        this.props.setSelectedCustomerClass(defaultState.selectedCustomerClass);
        this.props.setSelectedOddGroup(defaultState.selectedOddGroup);
        this.props.setUsername('');
        this.props.setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency);
        this.props.setViewCashOutOnly(defaultState.isViewCashOutOnly);
        this.props.setExcludeTestData(defaultState.isExcludeTestData);
        this.props.setSelectedGroupByOption(defaultState.selectedGroupByOption);
        this.props.setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption);
        this.setState({appData: Object.assign({}, JSON.parse(JSON.stringify(AppData)))});
    }

    render() {
        const isDisabledGroupInOriginalCurrency = this.props.selectedBreakDownByOption != BreakdownByMode.Currency;

        const userGuideButton = <div>
            {this._renderUserGuide()}
        </div>;

        return (
            <CollapsiblePanel className="page-filter" stickyFooter={userGuideButton}>
                <div className="row">
                    <ToastContainer
                        autoClose={10000}
                        pauseOnFocusLoss={false}
                        style={{ width: "500px" }}
                        transition={Flip} />

                    {this.showSubsidiaryDropdown && this.state.subsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                {this.whiteLabelView ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary2")}
                            </label>
                            {this._renderSubsidiaryTreeView()}
                        </div>
                    </div>}

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                            {this._renderDateRange()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
                            {this._renderProductSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
                            {this._renderSportSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("BetType")}</label>
                            {this._renderBettypeSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Platform")}</label>
                            {this._renderPlatformSelectList()}
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
                            {this._renderStatusSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("LiveStatus")}</label>
                            {this._renderLiveStatusSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
                            {this._renderBaseCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("VIPPlayerOnly")}</label>
                            {this._renderVipOnlySelectedList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("CustomerClass")}</label>
                            {this._renderCustomerClassSelectList()}
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
                            {this._renderOddGroupSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="IsGroupInOriginalCurrency"
                                disabled={isDisabledGroupInOriginalCurrency}
                                checked={this.props.isGroupInOriginalCurrency}
                                onChange={(checked) => this.props.setGroupInOriginalCurrency(checked)}
                                label={LangHelper.getSingleResource("IsGroupInOriginalCurrency")} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="IsExcludeTestData"
                                checked={this.props.isExcludeTestData}
                                onChange={(checked) => this.props.setExcludeTestData(checked)}
                                label={LangHelper.getSingleResource("ExcludeTestData")} />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="IsViewCashOutOnly"
                                checked={this.props.isViewCashOutOnly}
                                onChange={(checked) => this.props.setViewCashOutOnly(checked)}
                                label={LangHelper.getSingleResource("ViewCashOutOnly")} />
                        </div>
                    </div>

                    {this.showSubsidiarySearchCheckBox && (
                        <div className='col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2'>
                            <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.state.subsidiarySearch}
                                onChange={checked => { this.setState({subsidiarySearch : checked}); checked && this.props.setSubsidiaryList(this.defaultSelectedSubsidiary)}}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                            </div>
                        </div>
                    )}

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-no-border" onClick={this.clearFilter}>{LangHelper.getSingleResource("ClearAllFilters")}</button>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    const { requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedPlatform, platformList, selectedVipOnly, selectedCustomerClass,
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedBreakDownByOption,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary
    } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedPlatform, platformList, selectedVipOnly, selectedCustomerClass,
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedBreakDownByOption,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);