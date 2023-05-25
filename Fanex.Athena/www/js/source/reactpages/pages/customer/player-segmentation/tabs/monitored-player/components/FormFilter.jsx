import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import UserGuide from '@jsroot/components/UserGuide'
import CheckBox from '@jsroot/components/CheckBox'
import { DateRange } from '@jsroot/components/date-range'
import LangHelper from '@jsroot/lib/langHelper'
import StringHelper from '@jsroot/lib/stringHelper'
import AppData from '@jsroot/lib/AppData'
import { SubsidiaryViewType, TreeViewOption } from '@jsroot/constants/report'
import { ActionCreators } from '../actions'
import DataSourceHelper from '../../../lib/helpers/dataSourceHelper';
import ParamHelper from "../helper/paramHelper";
import GridHelper from "../../../lib/helpers/gridHelper";
import { tabKeys } from '../../../lib/constants';
import { UserActionType } from '../lib/constants'
import MonitoredPlayerService from '../lib/queryService'

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.notificationHistoryDataNote = LangHelper.getSingleResource("NotificationHistoryDataNote")
        .replace("{0}", AppData[tabKeys.monitoredPlayer].dateConstraint.minDate);
    }

    _submit = (event) => {
        event.preventDefault();
        const { setSelectedParams, searchPlayer } = this.props;
        const params = ParamHelper.ToAPIParams(this.props);
        if (!params) {
            return;
        }
        setSelectedParams(params);
        searchPlayer(tabKeys.monitoredPlayer, params, GridHelper.callBackToUpdatePaging(this.props));
    }

    _addNew = (event) => {
        event.preventDefault();
        this.props.setCurrentUserAction({ type: UserActionType.AddNew, data: {} });
    }

    _exportExcel = (event) => {
        event.preventDefault();
        const { selectedParams, pagingOption } = this.props;
        if (!selectedParams) {
            return;
        }
        MonitoredPlayerService.exportMontioredPlayerList({ ...selectedParams, ...pagingOption }); 
    }

    showUserGuide = () => {
        const userGuideContent = this.props.userGuideContent;
        if (!userGuideContent || userGuideContent.length === 0) {
            this.props.getUserGuideContent('PlayerSegmentationMonitored');
        }
    }

    _renderUserGuide() {
        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={`${LangHelper.getSingleResource("PlayerSegmentation")} / ${LangHelper.getSingleResource('MonitoredPlayer')}`}
            onClick={this.showUserGuide}
            content={this.props.userGuideContent} />)
    }

    _renderDateRange() {
        const { isGetAll, dateRange } = this.props;
        const dateConstraint = AppData[tabKeys.monitoredPlayer].dateConstraint;
        return (
            <div className={isGetAll ? 'datepicker-disabled' : ''}>
                <DateRange
                    startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    toDate={dateRange.toDate}
                    onChange={this.props.setDateRange}
                />
            </div>
        )
    }

    _renderCurrencySelectList() {
        const { selectedCurrency } = this.props;
        const currencyList = AppData[tabKeys.monitoredPlayer].currencyList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(currencyList, selectedCurrency);
        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => this.props.setSelectedCurrency(selectedItemsKey)} />);
    }

    _renderStickyFooter() {
        return (<div>
            <i className="icon-excel right" onClick={this._exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
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

    render() {
        const isDisabledSubmit = (this.props.subsidiarySearch && StringHelper.isEmptyOrWhiteSpace(this.props.selectedSubsidiary)) || StringHelper.isEmptyOrWhiteSpace(this.props.selectedCurrency);
        return (
            <CollapsiblePanel className="page-filter" stickyFooter={this._renderStickyFooter()}>
                <div className="row">
                    {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && this.props.subsidiarySearch && (<div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {this._renderSubsidiaryTreeView()}
                        </div>
                    </div>)}
                    {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && <div className="col-12 col-md-3 col-sm-2 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.props.subsidiarySearch}
                                onChange={this.props.setSubsidiarySearch}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                        </div>
                    </div>}
                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("ReachedDate")}</label>
                            {this._renderDateRange()}
                        </div>
                    </div>
                    <div className="col-12 col-md-1 col-sm-2 col-lg-1 col-xl-1">
                        <div className="form-group">
                            <CheckBox id="IsGetAll"
                                checked={this.props.isGetAll}
                                onChange={this.props.changeIsGetAll}
                                label={LangHelper.getSingleResource("GetAll")} />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete
                                onSelect={this.props.setUsername}
                                onInput={this.props.setUsername}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-sm-8 col-lg-4 col-xl-3">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" disabled={isDisabledSubmit} onClick={this._submit}>{LangHelper.getSingleResource("Submit")}</button>
                                <button type="button" className="btn btn-add" disabled={!this.props.canEdit} onClick={this._addNew}>{LangHelper.getSingleResource("AddNew")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span className="circle"></span>
                        <span>{this.notificationHistoryDataNote}</span>
                    </div>
                </div>

            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const { setDateRange, changeIsGetAll, setUsername, setSelectedCurrency, getUserGuideContent,
        setSelectedParams, setSubsidiaryList, setSubsidiarySearch, searchPlayer, setPagingOption, setCurrentUserAction } = ActionCreators;

    return bindActionCreators(Object.assign({}, {
        setDateRange,
        changeIsGetAll,
        setUsername,
        setSelectedCurrency,
        getUserGuideContent,
        setSelectedParams,
        setSubsidiaryList,
        setSubsidiarySearch,
        searchPlayer,
        setPagingOption,
        setCurrentUserAction
    }), dispatch);
}

function mapStateToProps(state) {
    const { dateRange, supportedReachedDateRange, isGetAll, selectedCurrency, selectedParams,
        username, selectedSubsidiary, subsidiarySearch, pagingOption, userGuideContent } = state;

    return Object.assign({}, {
        dateRange,
        supportedReachedDateRange,
        isGetAll,
        selectedCurrency,
        selectedSubsidiary,
        username,
        selectedParams,
        subsidiarySearch,
        pagingOption,
        userGuideContent,
        canEdit: state.permissions.canEdit
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
