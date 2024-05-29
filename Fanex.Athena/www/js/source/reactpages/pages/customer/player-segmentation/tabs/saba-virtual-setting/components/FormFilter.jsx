import React, { PureComponent, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import CheckBox from '@jsroot/components/CheckBox'
import { DateRange } from '@jsroot/components/date-range'
import LangHelper from '@jsroot/lib/langHelper'
import StringHelper from '@jsroot/lib/stringHelper'
import Site from '@jsroot/lib/site';
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { SubsidiaryViewType, TreeViewOption } from '@jsroot/constants/report'
import { ActionCreators } from '../actions'
import { Url } from '../lib/constants';
import ParamHelper from '../lib/helpers/paramHelper';
import DataSourceHelper from '../../../lib/helpers/dataSourceHelper';
import GridHelper from '../../../lib/helpers/gridHelper';

export const FormFilter = (props) => {
    const [selectedSport, setSport] = useState(AppData.SabaVirtualSetting.selectedSport);
    const [selectedLevel, setLevel] = useState(AppData.SabaVirtualSetting.selectedLevel);

    const _submit = (event) => {
        event.preventDefault();
        const { setSelectedParams, searchPlayer, selectedTabKey } = props;
        const defaultSort = { orderCol: 2, sortType: 1 };
        const params = ParamHelper.ToAPIParams(props, defaultSort, selectedSport, selectedLevel);
        if (!params) {
            return;
        }
        setSelectedParams(params);
        searchPlayer(selectedTabKey, params, GridHelper.callBackToUpdatePaging(props));
    }

    const exportExcel = (event) => {
        event.preventDefault();
        const { selectedParams, pagingOption } = props;
        if (!selectedParams) {
            return;
        }
        const sortInfo = GridHelper.getSortInfoFromPagingOption(pagingOption);
        const params = {
            ...selectedParams,
            ...sortInfo
        }

        DataService.getFile(Url.exportSabaVirtualPlayerList, params)
            .then((response) => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource("NoInfo"));
                } else {
                    var filename = AppData.isHideSaba ? "VirtualSportsSetting.xls" : 'SabaVirtualSetting.xls';
                    Site.downloadFile(response.data, filename);
                }
            });
    }

    const _renderDateRange = () => {
        const { isGetAll, dateRange } = props;
        const dateConstraint = AppData.SabaVirtualSetting.dateConstraint;
        return (
            <div className={isGetAll ? 'datepicker-disabled' : ''}>
                <DateRange
                    startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    toDate={dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                    onChange={_onChangeDateRange}
                />
            </div>
        )
    }

    const _onChangeDateRange = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            props.setDateRange(date);
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", 1);
            alert(message);
        }
    }

    const _renderCurrencySelectList = () => {
        const { selectedCurrency } = props;
        const currencyList = AppData.SabaVirtualSetting.currencyList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(currencyList, selectedCurrency);
        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => props.setSelectedCurrency(selectedItemsKey)} />);
    }

    const _renderSportSelectList = () => {
        const sportList = AppData.SabaVirtualSetting.sportList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(sportList, selectedSport);
        return sportList && sportList.length && (
            <MultipleSelect id="ddlSport"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => setSport(selectedItemsKey)} />);
    }

    const _renderStickyFooter = () => {
        return (<div>
            <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
        </div>);
    }

    const _onChangeSubsidiaryList = (currentItem, selectedItemsKey, treeViewList) => {
        props.setSubsidiaryList(selectedItemsKey);
    }

    const _renderSubsidiaryTreeView = () => {
        return <TreeViewSelect
            language={LangHelper.currentLanguage}
            id="SubsidiaryTreeView"
            dataSource={AppData.subsidiaryList}
            keyField="Value"
            valueField="Name"
            statusField="Checked"
            texts={{ SelectOptions: "Please select" }}
            isAllTextShown={false}
            hasSearchBox={false}
            treeViewOption={TreeViewOption}
            onChange={_onChangeSubsidiaryList} />;
    }

    const _renderLevelSelectList = () => {
        const levelList = AppData.SabaVirtualSetting.levelList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(levelList, selectedLevel);

        return levelList && levelList.length && (
            <MultipleSelect id="ddlLevel"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => setLevel(selectedItemsKey)} />);
    }

    const isDisabledSubmit = (
        props.subsidiarySearch
        && StringHelper.isEmptyOrWhiteSpace(props.selectedSubsidiary))
        || StringHelper.isEmptyOrWhiteSpace(props.selectedCurrency)
        || StringHelper.isEmptyOrWhiteSpace(selectedSport)
        || StringHelper.isEmptyOrWhiteSpace(selectedLevel);

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={_renderStickyFooter()}>
            <div className="row">
                {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && props.subsidiarySearch && (<div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">
                            {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                        </label>
                        {_renderSubsidiaryTreeView()}
                    </div>
                </div>)}
                {AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT && <div className="col-12 col-md-3 col-sm-2 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="SubsidiarySearch"
                            checked={props.subsidiarySearch}
                            onChange={checked => props.setSubsidiarySearch(checked)}
                            label={LangHelper.getSingleResource("SubsidiarySearch")} />
                    </div>
                </div>}
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("LastModifiedDate")}</label>
                        {_renderDateRange()}
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-2 get-all-date">
                    <div className="form-group">
                        <CheckBox id="IsGetAll"
                            checked={props.isGetAll}
                            onChange={checked => props.changeIsGetAll(checked)}
                            label={LangHelper.getSingleResource("GetAll")} />
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                        <AutoComplete
                            onSelect={(value) => props.setUsername(value)}
                            onInput={(value) => props.setUsername(value)}
                            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("SabaVirtualSport", AppData.isHideSaba)}</label>
                        {_renderSportSelectList()}
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("SabaVirtualSetting", AppData.isHideSaba)}</label>
                        {_renderLevelSelectList()}
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                        {_renderCurrencySelectList()}
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" disabled={isDisabledSubmit} onClick={_submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    )
}

function mapDispatchToProps(dispatch) {
    const {
        setDateRange, changeIsGetAll, setUsername, setSelectedCurrency,
        setSelectedParams, searchPlayer, setPagingOption,
        setSubsidiaryList, setSubsidiarySearch } = ActionCreators;

    return bindActionCreators(Object.assign({}, {
        setDateRange,
        changeIsGetAll,
        setUsername,
        setSelectedCurrency,
        setSelectedParams,
        searchPlayer,
        setPagingOption,
        setSubsidiaryList,
        setSubsidiarySearch
    }), dispatch);
}

function mapStateToProps(state) {
    const {
        dateRange, isGetAll, selectedCurrency, selectedParams,
        username, pagingOption, selectedTabKey, selectedSubsidiary, subsidiarySearch
    } = state;

    return Object.assign({}, {
        dateRange,
        isGetAll,
        selectedCurrency,
        selectedSubsidiary,
        username,
        selectedParams,
        pagingOption,
        selectedTabKey,
        subsidiarySearch
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
