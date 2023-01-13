import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import Site from '@jsroot/lib/site';
import ActionCreators from '../actions';
import { DateRange } from '@jsroot/components/date-range';
import MultipleSelect from '@9softstudio/react-multiselect';
import CheckBox from '@jsroot/components/CheckBox';
import UserGuide from '@jsroot/components/UserGuide';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ApiUrl, ReportLevel } from '../common/constants';
import Service from '../common/service';
import DataService from '@jsroot/lib/DataService';
import { SubsidiaryViewType, TreeViewOption } from '../../../constants/report'
import { TreeViewSelect } from '@9softstudio/react-multiselect'
import DataSourceHelper from '../../../../helpers/dataSourceHelper';

export const FormFilter = props => {
    const [isConvertAllToBaseCurrency, setConvertAllToBaseCurrency] = useState(true);
    const [isExcludeTest, setExcludeTest] = useState(true);
    const [baseCurrencyList, setBaseCurrencyList] = useState(AppData.baseCurrencyList);
    const [reportBy, setReportBy] = useState(1);
    const [disableSport, setDisableSport] = useState(new Date(props.dateRange.fromDate) < AppData.cutOffDate);

    useEffect(() => {
    }, []);

    const onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
            checkDisableSport(range.startDate.toDate());
        } else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const checkDisableSport = startDate => {
        const tempStatus = startDate < AppData.cutOffDate;
        if(tempStatus && tempStatus !== disableSport) {
            props.setSelectedSport(AppData.defaultSelectedSport);
        }
        setDisableSport(tempStatus);
    }

    const _renderDateFilter = () => {
        const dateConstraint = AppData.dateConstraint;
        return (
            <DateRange
                startDate={props.dateRange.fromDate} endDate={props.dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={props.dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={onChangeDateRange}
            />
        )
    }

    const _renderBaseCurrencySelectList = () => {
        const selectedBaseCurrency = props.selectedBaseCurrency;
        return baseCurrencyList && baseCurrencyList.length ? (
            <Select instanceId="baseCurrency"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => props.setSelectedBaseCurrency(item.value)} />
        ) : <></>;
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

    const _renderSportSelectList = () => {
        const sportList = AppData.sportList;
        const dataSource = DataSourceHelper.CreateDataSourceFrom(sportList, props.selectedSport);

        return sportList && sportList.length && (
            <div className={(disableSport ? "select-disabled" :"")}>
                <MultipleSelect id="SportList"
                                hasSearchBox={true}
                                language={LangHelper.currentLanguage}
                                dataSource={dataSource}
                                keyField={"Id"}
                                valueField={"Value"}
                                statusField={"Status"}
                                onChange={(currentItem, selectedItemsKey) => props.setSelectedSport(selectedItemsKey)} />
            </div>
        );
    }

   const onChangeCurrency = (currencyIdList) => {
        let baseCurrency = "";
        let newBaseCurrencyList;

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) { // none or multi currencies
            newBaseCurrencyList = AppData.baseCurrencyList;
            baseCurrency = newBaseCurrencyList.find(x => x.label === props.selectedBaseCurrency) ?
                props.selectedBaseCurrency :
                AppData.defaultBaseCurrency;
            setBaseCurrencyList(newBaseCurrencyList);
        }
        else {
            const currencyName = AppData.currencyList.find(x => x.Id == currencyIdList).Value;
            baseCurrency = currencyName;

            if (!baseCurrencyList.find(x => x.label === currencyName)) {
                newBaseCurrencyList = AppData.baseCurrencyList.slice(0);
                newBaseCurrencyList.push({ value: baseCurrency, label: currencyName });
                setBaseCurrencyList(newBaseCurrencyList);
            }
            else {
                baseCurrency = currencyName;
            }
        }

        props.setSelectedCurrency(currencyIdList);
        props.setSelectedBaseCurrency(baseCurrency);
    }

    const onChangeSubsidiaryList = (currentItem, selectedItemsKey, treeViewList) => {
        props.setSubsidiaryList(selectedItemsKey);
    }

    const showUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            props.getUserGuideContent('NewCashOutWinLoss');
        }
    }

    const _renderUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("CashOutWinLoss")}
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

    const onSubmit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate, params.CurrencyName, params.BaseCurrencyName);
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

        const selectedCurrencyArray = props.selectedCurrency.split(',');
        const selectedSportArray = props.selectedSport.split(',');

        const currencyText = selectedCurrencyArray.length === AppData.currencyList.length ? 'All' 
            : AppData.currencyList.filter(item => selectedCurrencyArray.includes(item.Id.toString())).map(item => item.Value).join(',');        

        const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency);
        const subsidiarySearch = props.subsidiarySearch;

        return {
            PageSize: 50,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency,
            ReportBy: reportBy,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAllToBaseCurrency: isConvertAllToBaseCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            DrillDownLevel: ReportLevel.MAIN,
            IsExcludedTestData: isExcludeTest,
            SubsidiarySearch: subsidiarySearch,
            SubsidiaryList: subsidiarySearch ? props.selectedSubsidiary : "",
            SportIdList: AppData.sportList.length === selectedSportArray.length ? 'All' : props.selectedSport,
        }
    }

    
    const isValidModel = () => {
        const result = (!props.subsidiarySearch || !!props.selectedSubsidiary)
            && !!props.selectedCurrency && !!props.selectedBaseCurrency && !!props.selectedSport;
        return result;
    }

    const exportExcel = (event) => {
        event.preventDefault();
        let exportParam = props.requestParam;

        if (!exportParam || Site.isEmptyObject(exportParam)) {
            exportParam = getParams();
        }

        const exportRequestParam = { 
            ...exportParam,
            IsExportExcel : true
        };

        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam).then((response) => {
            toast.dismiss();
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = "CashOutWinLoss(New).xls";
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
                {showSubsidiarySearch && props.subsidiarySearch && (<div className='col-12 col-sm-4 col-md-3 col-xl-2'>
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {_renderSubsidiaryTreeView()}
                        </div>
                </div>)}
                <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        {_renderDateFilter()}
                    </div>
                </div>

                <div className="col-12 col-sm-4 col-md-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Sport")}</label>
                            {_renderSportSelectList()}
                        </div>
                    </div>

                <div className="col-12 col-sm-4 col-md-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                        {_renderCurrencySelectList()}
                    </div>
                </div>

                <div className="col-12 col-sm-4 col-md-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
                        {_renderBaseCurrencySelectList()}
                    </div>
                </div>

            </div>
            <div className="row">

                <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="ConvertAllFiguresToBaseCurrency"
                            checked={isConvertAllToBaseCurrency}
                            onChange={(checked) => setConvertAllToBaseCurrency(checked)}
                            label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
                    </div>
                </div>

                 <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                        <div className="form-group">
                               <label className="label-text">{LangHelper.getSingleResource("ReportBy")}</label>
                                <input type="radio" value={1} checked={reportBy == 1} name="ReportBy" id="reportbydaily"
                                onChange={() => setReportBy(1) } />
                                <label htmlFor="reportbydaily">{LangHelper.getSingleResource("Daily")}</label>
                                <input type="radio" value={2} name="ReportBy" id="reportbymonthly" checked={reportBy == 2}
                                        onChange={() => setReportBy(2)} />
                                <label htmlFor="reportbymonthly">{LangHelper.getSingleResource("Monthly")}</label>
                        </div>
                </div>

                <div className="col-12 col-sm-4 col-md-2 col-xl-2">
                    <div className="form-group">
                        <CheckBox id="ExcludeTest"
                            checked={isExcludeTest}
                            onChange={(checked) => setExcludeTest(checked)}
                            label={LangHelper.getSingleResource("ExcludeTestData")} />
                    </div>
                </div>

                {!showSubsidiarySearch && <div className='col-12 col-sm-3 col-md-2 col-xl-1'>
                        <div className="form-group">
                            <div className="button-group">
                                <button type='button' className='btn btn-submit'
                                    disabled={!isValidModel()}
                                    onClick={onSubmit}>{LangHelper.getSingleResource('Submit')}</button>
                            </div>
                        </div>
                </div>}

                {showSubsidiarySearch && <>
                    <div className='col-12 col-sm-3 col-md-2 col-xl-1'>
                        <div className="form-group">
                            <div className="button-group">
                                <button type='button' className='btn btn-submit'
                                    disabled={!isValidModel()}
                                    onClick={onSubmit}>{LangHelper.getSingleResource('Submit')}</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                        <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={props.subsidiarySearch}
                                onChange={checked => props.setSubsidiarySearch(checked)}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                        </div>
                    </div>
                </>}      
            </div>
            <div className="row">
                <div class="col-12 col-sm-4 col-md-3 col-xl-3">
                    <ul class="list result-note">
                        <li>{LangHelper.getSingleResource('CashOutWL_SportNote')}</li>
                    </ul>
                </div>
            </div>

        </CollapsiblePanel>
        </>);
}     
    

function mapStateToProps(state) {
    const { requestParam, dateRange, selectedCurrency, selectedSport, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent, 
        subsidiarySearch, selectedSubsidiary } = state;

    return Object.assign({}, {
        requestParam, dateRange, selectedCurrency, selectedSport, baseCurrencyList, selectedBaseCurrency, selectedStatus, userGuideContent,
        subsidiarySearch, selectedSubsidiary
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);