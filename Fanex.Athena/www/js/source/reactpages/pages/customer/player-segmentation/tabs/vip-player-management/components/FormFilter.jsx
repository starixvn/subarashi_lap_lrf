import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import CheckBox from '@jsroot/components/CheckBox'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import UserGuide from '@jsroot/components/UserGuide'
import LangHelper from '@jsroot/lib/langHelper'
import StringHelper from '@jsroot/lib/stringHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { ActionCreators } from '../actions'
import { Url, SearchingDateRangeOptions } from '../lib/constants';
import { SubsidiaryViewType, TreeViewOption } from '@jsroot/constants/report'
import DataSourceHelper from '../../../lib/helpers/dataSourceHelper';
import ParamHelper from "../lib/helpers/paramHelper";
import GridHelper from "../../../lib/helpers/gridHelper";
import { DateRange } from '@jsroot/components/date-range';
import SearchingDateRangeOption from "./SearchingDateRangeOption";
import { tabKeys } from '../../../lib/constants';
export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);
    }

    _submit = (event) => {
        event.preventDefault();
        var isCheckAll = !this.props.searchingDateRangeOption || this.props.searchingDateRangeOption == SearchingDateRangeOptions.AllDate;
        
        const params = ParamHelper.ToAPIParams(this.props, isCheckAll);
        if (!params) {
            return;
        }
        this.props.setSelectedParams(params);
        this.props.searchPlayer(this.props.selectedTabKey, params, GridHelper.callBackToUpdatePaging(this.props));
    }

    exportExcel = (event) => {
        event.preventDefault();
        const { selectedParams, pagingOption } = this.props;
        if (!selectedParams) {
            return;
        }
        const params = {
            ...selectedParams,
            ...pagingOption
        }

        DataService.getFile(Url.exportVipPlayerList, params).then((response) => {
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                var filename = "VipPlayerList.xls";
                var disposition = response.headers["content-disposition"];
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }

                Site.downloadFile(response.data, filename);
            }
        });
    }

    _renderVipOptionSelectList() {
        const { selectedVipOption, setSelectedVipOption, selectedTabKey } = this.props;
        const vipOptions = AppData[selectedTabKey].vipOptions;
        return vipOptions && vipOptions.length && (
            <Select instanceId="VipOptions"
                isSearchable={false}
                value={selectedVipOption}
                options={vipOptions}
                onChange={(item) => setSelectedVipOption(item.value)} />
        );
    }

    _renderCurrencySelectList() {
        const { selectedCurrency, selectedTabKey } = this.props;
        const currencyList = AppData[selectedTabKey].currencyList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(currencyList, selectedCurrency);
        return currencyList && currencyList.length && (
            <MultipleSelect id="permissionCurrency"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedCurrency(selectedItemsKey)} />);
    }

    showUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;
        if (!userGuideContent || userGuideContent.length === 0) {
            this.props.getUserGuideContent('PlayerSegmentationVIP');
        }
    }

    _renderUserGuide() {
        const userGuideContent = this.props.userGuideContent;
        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={`${LangHelper.getSingleResource("PlayerSegmentation")} / ${LangHelper.getSingleResource('VipPlayerManagement')}`}
            onClick={this.showUserGuide}
            content={userGuideContent} />)
    }

    _renderStickyFooter() {
        return (<div>
            <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
            {this._renderUserGuide()}
        </div>);
    }

    _onChangeSubsidiaryList = (currentItem, selectedItemsKey, treeViewList) => {
        this.props.setSubsidiaryList(selectedItemsKey);
    }

    _renderSubsidiaryTreeView() {
        return <TreeViewSelect
            language={LangHelper.currentLanguage}
            id="SubsidiaryTreeView"
            dataSource={AppData.subsidiaryList}
            keyField="Value"
            valueField="Name"
            statusField="Checked"
            texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
            isAllTextShown={false}
            hasSearchBox={false}
            treeViewOption={TreeViewOption}
            onChange={this._onChangeSubsidiaryList} />;
    }

    _renderRiskLevelSelectList() {
        const { selectedRiskLevel, selectedTabKey } = this.props;

        const riskLevelList = AppData[selectedTabKey].riskLevelList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(riskLevelList, selectedRiskLevel);

        return riskLevelList && riskLevelList.length && (
            <MultipleSelect id="ddlRiskLevel"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => {
                    this.props.setSelectedRiskLevel(selectedItemsKey);
                    var customerClassSelected = riskLevelList.filter(r => selectedItemsKey.includes(r.key)).map(r => r.customerClassList).join(',');
                    this.props.setSelectedCustomerClass(customerClassSelected);
                }} 
            />
        );
    }

    _renderRiskLevelLastMarkDate() {
        const dateRange = this.props.dateRange;
        const dateConstraint = AppData[tabKeys.vipPlayerManagement].dateConstraint;
        const isDisabled = !this.props.searchingDateRangeOption || this.props.searchingDateRangeOption == SearchingDateRangeOptions.AllDate;
        const className = !this.props.subsidiarySearch ? { dateRange:"rdr-DateRange rdr-DateRange-index rdr-DateRange-right-align" } : null;

        return (
            <div className={isDisabled ? 'datepicker-disabled' : ''}>
                <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    today={dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                    onChange={this.props.setDateRange} classNames={className}/>
            </div>
        )
    }

    render() {
        const isDisabledSubmit = (this.props.subsidiarySearch && StringHelper.isEmptyOrWhiteSpace(this.props.selectedSubsidiary))
            || StringHelper.isEmptyOrWhiteSpace(this.props.selectedCurrency) || StringHelper.isEmptyOrWhiteSpace(this.props.selectedCustomerClass);

        return (
            <CollapsiblePanel className="page-filter" stickyFooter={this._renderStickyFooter()}>
                <div className="row">
                    {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && this.props.subsidiarySearch && (<div className="col-12 col-md-2 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {this._renderSubsidiaryTreeView()}
                        </div>
                    </div>)}
                    {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-2 subsidiary-checkbox">
                        <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.props.subsidiarySearch}
                                onChange={checked => this.props.setSubsidiarySearch(checked)}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                        </div>
                    </div>}
                    <div className="col-12 col-md-2 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("VIP2")}</label>
                            {this._renderVipOptionSelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>
                    <div className="col-12 col-md-2 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("RiskLevel")}</label>
                            {this._renderRiskLevelSelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-3 last-mark-date">
                        <div className="form-group">
                            <label className="label-text">
                                {LangHelper.getSingleResource("RiskLevelLastMarkDate").replace("&apos;","'")}
                                <SearchingDateRangeOption
                                    value={this.props.searchingDateRangeOption}
                                    onChange={(event) => {
                                        this.props.setSearchingDateRangeOption(event.target.value)
                                        // do something
                                    }}
                                />
                            </label>
                            {this._renderRiskLevelLastMarkDate()}
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" disabled={isDisabledSubmit} onClick={this._submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const {
        setDateRange, setSelectedVipOption, setUsername, setSelectedCurrency,
        setSelectedParams, searchPlayer, setPagingOption, setSubsidiaryList,
        getUserGuideContent, setSubsidiarySearch, setSelectedCustomerClass,
        setSelectedRiskLevel, setSearchingDateRangeOption 
    } = ActionCreators;

    return bindActionCreators(Object.assign({}, {
        setSelectedVipOption, setDateRange, setUsername, setSelectedCurrency,
        setSelectedParams, searchPlayer, setPagingOption, setSubsidiaryList,
        getUserGuideContent, setSubsidiarySearch, setSelectedCustomerClass,
        setSelectedRiskLevel, setSearchingDateRangeOption
    }), dispatch);
}

function mapStateToProps(state) {
    const {
        dateRange, selectedVipOption, selectedCurrency, selectedParams,
        username, pagingOption, selectedTabKey, userGuideContent,
        selectedSubsidiary, subsidiarySearch, selectedCustomerClass,
        selectedRiskLevel, searchingDateRangeOption 
    } = state;

    return Object.assign({}, {
        selectedVipOption,
        dateRange,
        selectedCurrency,
        username,
        selectedParams,
        pagingOption,
        selectedTabKey,
        userGuideContent,
        selectedSubsidiary,
        subsidiarySearch,
        selectedCustomerClass,
        selectedRiskLevel,
        searchingDateRangeOption
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
