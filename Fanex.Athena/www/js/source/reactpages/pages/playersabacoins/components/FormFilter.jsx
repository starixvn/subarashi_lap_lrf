import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import Site from '@jsroot/lib/site';
import { ActionCreators }  from '../actions';
import { DateRange } from '@jsroot/components/date-range';
import MultipleSelect from '@legion-lib/react-multiselect';
import CheckBox from '@jsroot/components/CheckBox';
import UserGuide from '@jsroot/components/UserGuide';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ApiUrl } from '../lib/constants';
import Service from '../lib/service';
import DataService from '@jsroot/lib/DataService.js';
import { SubsidiaryViewType, TreeViewOption } from '../../../constants/report';
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import { DefaultPagingOption } from '../lib/constants'

export const FormFilter = props => {
    const [isExcludeTest, setExcludeTest] = useState(true);
    const [username, setUsername] = useState('');

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateFilter = () => {
        const dateConstraint = AppData.dateConstraint;
        return (
            <DateRange
                startDate={props.dateRange.fromDate} endDate={props.dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={props.dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={_onChangeDateRange}
            />
        )
    }

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length ? (
            <MultipleSelect id="CurrencyList"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)} />) : <></>;
    }

   const onChangeCurrency = (currencyIdList) => {
        props.setSelectedCurrency(currencyIdList);
    }

    const showUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            props.getUserGuideContent('PlayerSabaCoins');
        }
    }

    const _renderUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("PlayerSabaCoins")}
                onClick={showUserGuide}
                content={userGuideContent} />)
    }

    const _renderSubsidiaryTreeView = () => {
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
            onChange={onChangeSubsidiaryList} />;
    }

    const onChangeSubsidiaryList = (currentItem, selectedItemsKey, treeViewList) => {
        props.setSubsidiaryList(selectedItemsKey);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate);
        props.setReportTitle(title);
        props.setRequestParam(params);
        props.toggleLoader(true);
        props.getReportData(ApiUrl.REPORT_DATA_URL, params);
    }

    const getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        const { SortBy, SortOrder } = props.requestParam;
        const subsidiarySearch = props.subsidiarySearch;

        return {
            PageSize: DefaultPagingOption.PageSize,
            PageIndex: DefaultPagingOption.PageIndex,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            CurrencyIdList: props.selectedCurrency,
            SubsidiarySearch: subsidiarySearch,
            SubsidiaryList: subsidiarySearch ? props.selectedSubsidiary : "",
            Username : username,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsExcludedTestData: isExcludeTest,
        }
    }

    const isValidModel = () => (!props.subsidiarySearch || !!props.selectedSubsidiary) && !!props.selectedCurrency

    const exportExcel = (event) => {
        event.preventDefault();
        let exportParam = props.requestParam;

        if (!exportParam || Site.isEmptyObject(exportParam)) {
            exportParam = getParams();
        }

        const exportRequestParam = { 
            ...exportParam,
            PageSize: 0,
            PageIndex: 0
        };

        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam).then((response) => {
            toast.dismiss();
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = "PlayerSabaCoins.xls";
                Site.downloadFile(response.data, fileName);
            } 
            props.toggleLoader(false);
        }).catch(error => {
            alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            props.toggleLoader(false);
        });
    }

    const excelButton = <div>
        <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
        {_renderUserGuide()}
    </div>;

    const showSubsidiarySearch = AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT;

    return (
        <>
        <CollapsiblePanel className="page-filter" stickyFooter={excelButton}>
            <div className="row">
                <ToastContainer
                    autoClose={10000}
                    pauseOnFocusLoss={false}
                    style={{ width: "500px" }}
                    transition={Flip} />
                
                {showSubsidiarySearch && props.subsidiarySearch && (<div className='col-12 col-sm-3 col-md-3 col-lg-4 col-xl-2'>
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {_renderSubsidiaryTreeView()}
                        </div>
                </div>)}

                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        {_renderDateFilter()}
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                        <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
                            onSelect={(value) => setUsername(value)}
                            onInput={(value) => setUsername(value)}
                            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                        {_renderCurrencySelectList()}
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="ExcludeTest"
                            checked={isExcludeTest}
                            onChange={(checked) => setExcludeTest(checked)}
                            label={LangHelper.getSingleResource("ExcludeTestData")} />
                    </div>
                </div>

                <div className="col-12 col-md-5 col-sm-5 col-lg-4 col-xl-2">
                    <div className="row">

                        <div className="col-12 col-md-4 col-sm-5 col-lg-4 col-xl-5">
                            <div className="form-group">
                                <div className="button-group">
                                    <button type="button" disabled={!isValidModel()} className="btn btn-submit" onClick={onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                                </div>
                            </div>
                        </div>

                        {showSubsidiarySearch && <>
                            <div className='col-12 col-md-8 col-sm-7 col-lg-8 col-xl-7'>
                                <div className="form-group">
                                    <CheckBox id="SubsidiarySearch"
                                        checked={props.subsidiarySearch}
                                        onChange={checked => props.setSubsidiarySearch(checked)}
                                        label={LangHelper.getSingleResource("SubsidiarySearch")} />
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>

        </CollapsiblePanel>
        </>);
}     
    

function mapStateToProps(state) {
    const { requestParam, dateRange, selectedCurrency, userGuideContent, subsidiarySearch, selectedSubsidiary } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedCurrency, userGuideContent, subsidiarySearch, selectedSubsidiary});
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);