import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast, Flip } from 'react-toastify';

import Select from 'react-select'
import MultipleSelect from '@9softstudio/react-multiselect'
import { DateRange } from '@jsroot/components/date-range'
import AutoComplete from '@jsroot/components/auto-complete'
import CheckBox from '@jsroot/components/CheckBox'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import UserGuide from '@jsroot/components/UserGuide'
import AppData from '@jsroot/lib/AppData'

import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import { ApiUrl, DisplayGroupBreakDownMapping, ProductCode } from '../../common/constants'

import { SubsidiaryViewType, TreeViewOption } from '../../../../constants/report'
import { TreeViewSelect } from '@9softstudio/react-multiselect'
import SearchOption from './SearchOption.jsx';

const ToastMsg = () => (
    <div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg1")}</div>
        <div>{LangHelper.getSingleResource("BTCExportExcelMsg2")}</div>
    </div>
)

export class MainFilter extends Component {
    defaultSelectedSubsidiary = AppData.subsidiaryList.join(',');
    showSubsidiaryDropdown = AppData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT && AppData.subsidiaryList.length > 0;
    showSubsidiarySearchCheckBox = this.showSubsidiaryDropdown && AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT;
    whiteLabelView = AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT && !AppData.isOneworksMaster;
    constructor(props) {
        super(props);
        this.baseCurrencyList = AppData.baseCurrencyList;
        this.defaultBaseCurrency = props.selectedBaseCurrency;
    }
    

    componentDidMount() {
        this._onChangeProduct(null,this.props.selectedProduct);
    }

    componentDidUpdate(prevProps){
        if(prevProps.appUuid != this.props.appUuid){
            this._onChangeProduct(null, this.props.selectedProduct)
        }
    }

    _showExportWarning = () => {
        toast.success(<ToastMsg />);
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
            <DateRange key={`date-${this.props.appUuid}`} startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateConstraint.maxDate} limitedMonthRange={dateConstraint.limitedMonthRange}
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
        const productList = AppData.productList;

        return productList && productList.length && (
            <MultipleSelect key={`product-${this.props.appUuid}`} 
                id="ProductList"
                language={LangHelper.currentLanguage}
                value={this.props.selectedProduct}
                hasSearchBox={true}
                dataSource={productList}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange= {this._onChangeProduct} />
        );
    }

    _onChangeProduct = (currentItem, selectedItemsKey) => {
        this.props.setSelectedProduct(selectedItemsKey);
        if (!this.isContainProductSportBookOrBa(selectedItemsKey)){
            this.props.setViewCashOutOnly(false);
        }
        this.props.getSportList(selectedItemsKey);
        this.props.getBetTypeList(selectedItemsKey);
    }

    _renderSportSelectList() {
        const sportList = this.props.sportList;
        if(!sportList || !sportList.length){
            return(
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SportList"
                dataSource={[]}
                keyField="Value"
                valueField="Name"
                statusField="Checked"
                texts={{ SelectOptions: "Please select", All: "N/A", SelectedItemCount: "# selected" }}
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption} />
            )
        }

        return sportList && sportList.length && (
            <TreeViewSelect
                key={`sport-${this.props.appUuid}`}
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
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="BetTypeList"
                    dataSource={[]}
                    keyField="Value"
                    valueField="Name"
                    statusField="Checked"
                    texts={{ SelectOptions: "Please select", All: "N/A", SelectedItemCount: "# selected" }}
                    isAllTextShown={true}
                    hasSearchBox={true}
                    treeViewOption={TreeViewOption} />
            );
        }

        return bettypeList && bettypeList.length && (
            <TreeViewSelect
                key={`bettype-${this.props.appUuid}`}
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
        const platformList = AppData.platformList;

        return platformList && platformList.length && (
            <MultipleSelect key={`platform-${this.props.appUuid}`}
                id="PlatformList"
                language={LangHelper.currentLanguage}
                value={this.props.selectedPlatform}
                dataSource={platformList}
                valueField={"value"}
                keyField={"id"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedPlatform(selectedItemsKey)} />
        );
    }

    _renderCurrencySelectList() {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect key={`currency-${this.props.appUuid}`}
                id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => this._onChangeCurrency(selectedItemsKey)} />);
    }

    _onChangeCurrency = (currencyIdList) => {
        let baseCurrency = "";

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) { // none or multi currencies
            this.baseCurrencyList = AppData.baseCurrencyList;
            baseCurrency = this.baseCurrencyList.find(x => x.label === this.props.selectedBaseCurrency) ?
                this.props.selectedBaseCurrency :
                this.defaultBaseCurrency;
        }
        else {
            const currencyName = AppData.currencyList.find(x => x.id == currencyIdList).value;
            baseCurrency = currencyName;
            if (!this.baseCurrencyList.find(x => x.label === currencyName)) {
                this.baseCurrencyList = AppData.baseCurrencyList.slice(0);
                this.baseCurrencyList.push({ value: currencyName, label: currencyName });
            }
        }

        this.props.setSelectedCurrency(currencyIdList)
        this.props.setSelectedBaseCurrency(baseCurrency);
    }

    _renderBaseCurrencySelectList() {
        const baseCurrencyList = this.baseCurrencyList;

        return baseCurrencyList && baseCurrencyList.length && (
            <Select key={`base-currency-${this.props.appUuid}`}
                instanceId="ddlBased"
                value={this.props.selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => this.props.setSelectedBaseCurrency(item.value)} />
        );
    }

    _renderVipOnlySelectedList() {
        const vipOnlyList = AppData.vipOnlyList;

        return vipOnlyList && vipOnlyList.length && (
            <Select key={`viponly-${this.props.appUuid}`}               
                instanceId="IsVipOnly"
                value={this.props.selectedVipOnly}
                options={vipOnlyList}
                onChange={(item) => this.props.setSelectedVipOnly(item.value)} />
        );
    }

    _renderStatusSelectList() {
        const statusList = AppData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect key={`status-${this.props.appUuid}`}
                id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedStatus(selectedItemsKey)} />);
    }

    _renderLiveStatusSelectList() {
        const liveStatusList = AppData.liveStatusList;

        return liveStatusList && liveStatusList.length && (
            <MultipleSelect key={`live-status-${this.props.appUuid}`}
                id="LiveStatusList"
                language={LangHelper.currentLanguage}
                dataSource={liveStatusList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => this.props.setSelectedLiveStatus(selectedItemsKey)} />);
    }

    _renderCustomerClassSelectList() {
        const customerClassList = AppData.customerClassList;

        return customerClassList && customerClassList.length && (
            <MultipleSelect key={`customerclass-${this.props.appUuid}`}
                id="ddlCustomerClass"
                language={LangHelper.currentLanguage}
                dataSource={customerClassList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedCustomerClass(selectedItemsKey)} />);
    }

    _renderOddsGroupSelectList() {
        const oddsGroupList = AppData.oddsGroupList;
        return oddsGroupList && oddsGroupList.length && (
            <MultipleSelect key={`odds-group-${this.props.appUuid}`}
                id="ddlOddGroup"
                language={LangHelper.currentLanguage}
                dataSource={oddsGroupList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedOddsGroup(selectedItemsKey)} />);
    }

    _renderSubsidiaryTreeView() {
        return <TreeViewSelect
            key={`subsidiary-${this.props.appUuid}`}
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

    _renderUsernameAutoComplete() {
        return <AutoComplete key={`username-${this.props.appUuid}`}
            url={ApiUrl.CUSTOMER_SEARCH_URL}
            onSelect={(value) => this.props.setUsername(value)}
            onInput={(value) => this.props.setUsername(value)}
            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
    }

    isContainProductSportBookOrBa = (selectedItemsKey) =>{
        var listSelectedProduct = selectedItemsKey.split(",");
        return listSelectedProduct.indexOf(ProductCode.SportsBook) >=0 || listSelectedProduct.indexOf(ProductCode.BA) >=0
    }

    _handleChangeSearchMode = (event) => {
        const { value } = event.target;
        this.props.setSearchMode(value);
    }

    render() {
        const { isOfferCashOutProduct, isHasPermissionViewVip } = AppData;
        const isEnableCashOutFilter = this.isContainProductSportBookOrBa(this.props.selectedProduct); 
        const currentMapping = DisplayGroupBreakDownMapping.find(item => item.groupByMode == this.props.selectedGroupByOption 
            && item.breakdownMode == this.props.selectedBreakDownByOption);
        const isDisabledGroupInOriginalCurrency = !currentMapping.isDisplayBreakDownInCurrency;

        const userGuideButton = <div>
            {this._renderUserGuide()}
        </div>;

        return (
            <CollapsiblePanel className="page-filter" isCollapseMode={false} stickyFooter={userGuideButton}>
                <div className="row">
                    <ToastContainer
                        autoClose={10000}
                        pauseOnFocusLoss={false}
                        style={{ width: "500px" }}
                        transition={Flip} />

                    {this.showSubsidiaryDropdown && this.props.subsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
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

                    { isHasPermissionViewVip && <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group" title={LangHelper.getSingleResource("VIPPlayerTooltipMsg")}>
                            <label className="label-text">{LangHelper.getSingleResource("VIPPlayerOnly")}</label>
                            {this._renderVipOnlySelectedList()}
                        </div>
                    </div> }

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("CustomerClass")}</label>
                            {this._renderCustomerClassSelectList()}
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
                            {this._renderOddsGroupSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                <span>{LangHelper.getSingleResource("Username")}</span>
                                <div className="search-option-container">
                                    <SearchOption value={this.props.searchMode} onChange={this._handleChangeSearchMode} />
                                </div>
                            </label>
                            {this._renderUsernameAutoComplete()}
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

                    { isOfferCashOutProduct && 
                        <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                            <div className="form-group">
                                <CheckBox id="IsViewCashOutOnly"
                                    checked={this.props.isViewCashOutOnly}
                                    onChange={(checked) => this.props.setViewCashOutOnly(checked)}
                                    disabled={!isEnableCashOutFilter}
                                    label={LangHelper.getSingleResource("ViewCashOutOnly")} />
                            </div>
                        </div>
                    }

                    {this.showSubsidiarySearchCheckBox && (
                        <div className='col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2'>
                            <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.props.subsidiarySearch}
                                onChange={checked => { this.props.setSubsidiarySearch(checked); checked && this.props.setSubsidiaryList(this.defaultSelectedSubsidiary)}}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                            </div>
                        </div>
                    )}                
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
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedGroupByOption, selectedBreakDownByOption, searchMode,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary, subsidiarySearch, appUuid
    } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedProduct, sportList, selectedSport, selectedBettype, bettypeList, selectedPlatform, platformList, selectedVipOnly, selectedCustomerClass,
        selectedOddsGroup, isExcludeTestData, isGroupInOriginalCurrency, isViewCashOutOnly, selectedGroupByOption, selectedBreakDownByOption, searchMode,
        selectedCurrency, baseCurrencyList, selectedBaseCurrency, selectedStatus, selectedLiveStatus, username, userGuideContent, selectedSubsidiary, subsidiarySearch, appUuid
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFilter);