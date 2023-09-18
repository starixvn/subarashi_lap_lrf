import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import { TreeViewSelect } from '@legion-lib/react-multiselect'
import CheckBox from '@jsroot/components/CheckBox'
import { DateRange } from '../../../components/date-range/index'
import LangHelper from '../../../lib/langHelper'
import {decode} from '../../../lib/htmlHelper.js'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import { ReportLevel, SubsidiaryViewType, TreeViewOption } from '../../../constants/report'
import AutoComplete from '@jsroot/components/auto-complete'
import { BaseCurrency } from '../../../constants/currency'
import { CUSTOMER_SEARCH_URL } from '../../../constants/url'
import ReportExcel from '../lib/reportExcel'
import { Service, ViewInType } from '../lib/service'
import moment from 'moment'

const RANGE_THREE_MONTH_CONSTRAINT = 3;
const RANGE_ONE_MOTHN_CONSTRAINT = 1;

export class FormFilter extends Component {
    constructor(props) {
        super(props);
    }

    submit = (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.toggleLoader(true);
        this.props.getGridData(params, () => {
            Service.showErrorMsg();
            this.props.toggleLoader(false);
        });

        this.props.setParams(params.data);
    }

    exportExcel = (event) => {
        event.preventDefault();

        const level = this.props.gridData.level || 0;

        const isAllowedCustomerComm = this.props.isAllowedCustomerComm;
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.toggleLoader(true);
        if (level === ReportLevel.MAIN) {
            this.props.exportExcel(params)
                .then(response => this._doExportExcel(level, params.data, isAllowedCustomerComm, response.data))
                .catch(() => {
                    Service.showErrorMsg();
                    this.props.toggleLoader(false);
                });
        }
        else {
            this._doExportExcel(level, params.data, isAllowedCustomerComm, this.props.gridData.data);
        }
    }

    _doExportExcel(level, params, isAllowedCustomerComm, gridData) {
        if (!gridData || !gridData.DataList.length) {
            this.props.toggleLoader(false);
            alert(LangHelper.getSingleResource("NoInfo"));
            return;
        }

        let excelData;
        if (level === ReportLevel.MAIN) {
            excelData = params;
        }
        else {
            const firstRow = gridData.DataList[0];
            const drillDownDate = Service.getDrilldownDateRange(params.ReportBy, params.FromDate, params.ToDate, firstRow.Date);

            excelData = {
                FromDate: Site.convertDateToString(moment(drillDownDate.fromDate)),
                ToDate: Site.convertDateToString(moment(drillDownDate.toDate)),
                BaseCurrency: gridData.AdditionalInfo,
                CurrencyName: firstRow.CurrencyName,
                CurrencyId: firstRow.CurrencyId,
                ReportBy: params.ReportBy,
                UserName: params.UserName
            };
        }

        const title = Service.getReportTitle(
            { fromDate: excelData.FromDate, toDate: excelData.ToDate },
            excelData.BaseCurrency ? excelData.BaseCurrency : excelData.CurrencyName,
            level === ReportLevel.MAIN ? excelData.CurrencyId === 0 : false,
            excelData.UserName,
            params.DateOptionType);
        const excel = new ReportExcel(gridData, title, level, isAllowedCustomerComm, excelData.ReportBy);
        excel.export(() => {
            this.props.toggleLoader(false);
        });
    }

    _getParams() {
        let param = {};

        const { fromDate, toDate } = this.props.dateRange;
        const subsidiarySearch = this.props.subsidiarySearch;
        const baseCurrency = BaseCurrency.find(x => x.value === this.props.selectedCurrency.value);

        param = {
            CurrencyId: this.props.selectedCurrency.value,
            BaseCurrency: baseCurrency ? baseCurrency.text : "",
            CurrencyName: baseCurrency ? baseCurrency.text : this.props.selectedCurrency.label,
            UserName: this.props.username,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ReportBy: this.props.selectedReportBy,
            IsExcludedTestData: this.props.isExcludeTest,
            Level: 0,
            SubsidiarySearch: subsidiarySearch,
            SubsidiaryList: subsidiarySearch ? this.props.selectedSubsidiary : "",
            DateOptionType: this.props.selectedViewInOption
        };

        return {
            data: param
        };
    }

    _getMonthRangeConstraint() {
        const { selectedViewInOption } = this.props;
        return selectedViewInOption === ViewInType.SettledOnly  ? RANGE_THREE_MONTH_CONSTRAINT : RANGE_ONE_MOTHN_CONSTRAINT;
    }

    applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            this.props.setDateRange(date);
        }
        else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', this._getMonthRangeConstraint());
            alert(message);
        }
    }

    changeReportBy = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && this.props.selectedReportBy !== newValue) {
            this.props.setReportBy(newValue);
        }
    }

    changeViewInOption = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && this.props.selectedViewInOption != newValue) {
            this.props.setViewInOption(newValue);
        }
    }

    getNoteMessage = () => {
        const { selectedViewInOption } = this.props;
        return selectedViewInOption === ViewInType.SettledOnly 
            ? LangHelper.getSingleResource("TheSettledDateOnlyNote") 
            : LangHelper.getSingleResource("TheSettledAndResettledDateNote");
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

    _renderDateRange() {
        const { dateRange } = this.props;
        const dateConstraint = AppData.dateConstraint;
        const limitMonthRange = this._getMonthRangeConstraint()
        return (
            <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateConstraint.toDay} limitedMonthRange={limitMonthRange}
                onChange={this.applyDateRangeHandler} />
        );
    }

    _renderCurrencySelectList() {
        const { selectedCurrency } = this.props;
        const currencyList = AppData.currencyList;
        return <Select instanceId='ddlCurrency'
            name='form-field-name'
            value={selectedCurrency}
            options={currencyList}
            onChange={(item) => this.props.setSelectedCurrency(item)} />
    }

    _renderReportByOption() {
        const { reportByOption, selectedReportBy } = this.props;

        return (<div className='form-group'>
            <label className='label-text'>{LangHelper.getSingleResource('ReportBy')}</label>
            {
                reportByOption.map((option, i) => {
                    const key = 'ReportBy' + i;
                    return (<span key={`Group${key}`}>
                        <input type='radio' value={option.value} checked={selectedReportBy === option.value} id={key}
                            onChange={this.changeReportBy} />
                        <label htmlFor={key}>{option.label}</label>
                    </span>)
                })
            }
        </div>);
    }

    _renderViewInOption() {
        const { viewInOption, selectedViewInOption } = this.props;
        return (<div className='form-group'>
            <label className='label-text'>{LangHelper.getSingleResource('ViewInWithNoParam')}</label>
            {
                viewInOption.map((option, i) => {
                    const key = 'ViewInType' + i;
                    return (<span key={`Group${key}`}>
                        <input type='radio' value={option.value} checked={selectedViewInOption === option.value} id={key}
                            onChange={this.changeViewInOption} />
                        <label htmlFor={key}>{option.label}</label>
                    </span>)
                })
            }
        </div>);
    }

    _renderExcludeTestDataCheckBox() {
        return (<div className="checkbox-group">
            <input type="checkbox" className="checkbox" checked={this.props.isExcludeTest} id="ExcludeTest"
                onChange={() => this.props.changeIsExcludeTest(!this.props.isExcludeTest)} />
            <label style={{ marginLeft: "0px" }} htmlFor="ExcludeTest">{LangHelper.getSingleResource("ExcludeTestData")}</label>
        </div>);
    }

    render() {
        const showSubsidiarySearch = AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT;
        return (
            <div className='page-filter'>
                <div className='row'>
                    {showSubsidiarySearch && this.props.subsidiarySearch && (<div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                        <div className="form-group">
                            <label className="label-text">
                                {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? LangHelper.getSingleResource("WhiteLabel") : LangHelper.getSingleResource("Subsidiary")}
                            </label>
                            {this._renderSubsidiaryTreeView()}
                        </div>
                    </div>)}
                    <div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('Date')}</label>
                            {this._renderDateRange()}
                        </div>
                    </div>

                    <div className='col-12 col-sm-4 col-md-2 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('Currency')}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete url={CUSTOMER_SEARCH_URL}
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
                        </div>
                    </div>

                    <div className='col-6 col-sm-3 col-md-2 col-xl-2'>
                        {this._renderReportByOption()}
                    </div>

                    <div className='col-6 col-sm-3 col-md-2 col-xl-2'>
                        <div className="form-group">
                            {this._renderExcludeTestDataCheckBox()}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-sm-8 col-md-4 col-xl-4'>
                        {this._renderViewInOption()}
                    </div>
                    <div className='col-12 col-sm-3 col-md-2 col-xl-1'>
                        <div className='form-group button-group'>
                            <button type='button' className='btn btn-submit'
                                disabled={this.props.subsidiarySearch && !this.props.selectedSubsidiary}
                                onClick={this.submit}>{LangHelper.getSingleResource('Submit')}</button>
                        </div>
                    </div>
                    {showSubsidiarySearch && <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                        <div className="form-group">
                            <CheckBox id="SubsidiarySearch"
                                checked={this.props.subsidiarySearch}
                                onChange={checked => this.props.setSubsidiarySearch(checked)}
                                label={LangHelper.getSingleResource("SubsidiarySearch")} />
                        </div>
                    </div>}
                </div>
                <div className="row">
                    <div className="col-11">
                        <span className="circle"></span>
                        <span>{decode(this.getNoteMessage())}</span>
                    </div>
                    <div className="col-11">
                        <span className="circle"></span>
                        <span>{decode(LangHelper.getSingleResource("TheSettledAndResettledDataNote"))}</span>
                    </div>
                </div>
                < div className='caret-block'>
                    <i className='icon-excel right' onClick={this.exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </div>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    const { licenseeId, ...rest } = state;
    return Object.assign({}, rest);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);