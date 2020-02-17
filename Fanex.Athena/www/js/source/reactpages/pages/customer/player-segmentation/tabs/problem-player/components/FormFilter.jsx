import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MultipleSelect from '@9softstudio/react-multiselect'
import AutoComplete from '@jsroot/components/auto-complete'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import CheckBox from '@jsroot/components/CheckBox'
import { DateRange } from '@jsroot/components/date-range'

import { ActionCreators } from '../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);
    }

    submit = (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.setReportTitle(Service.getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : ''));
        this.props.setRequestParam(params);
        this.props.toggleLoader(true);
        this.props.getGridData(ApiUrl.RUNNING_DATA_URL, params);
    }

    _getParams() {
        const { PageSize, SortBy, SortOrder } = this.props.requestParam;
        return {
            PageSize: PageSize,
            PageIndex: 1,
            Username: this.props.username,
            CurrencyIdList: this.props.selectedCurrency,
            SortBy: SortBy,
            SortOrder: SortOrder,
        }
    }

    exportExcel = (event) => {
        event.preventDefault();
        
        const params = this._getParams();
        if (!params) {
            return;
        }

        params.IsExport = true;
        this.props.toggleLoader(true);
        DataService.getFile(ApiUrl.RUNNING_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if(response.status === NoContentStatusCode){
                alert(LangHelper.getSingleResource("NoInfo"));
            }else {
                Site.downloadFile(response.data, 'BettingTicketsCenter_Running.xls');
            }
            this.props.toggleLoader(false);
        });
    }
    
    _renderDateRange() {
        const dateRange = this.props.dateRange;
        const dateConstraint = {
            mindDate: '01/01/2019',
            maxDate: '02/16/2020',
            limitedMonthRange: 1
        };

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
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", 1);
            alert(message);
        }
    }

    _renderCurrencySelectList() {
        const currencyList = [ { Key: 1, Value: 'USD', Status: true }, { Key: 2, Value: 'VND', Status: true }];
       
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
        this.props.setSelectedCurrency(currencyIdList)
    }

    _renderExcelIcon() {
        return (<div>
            <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
        </div>);
    }

     render() {
        return (
            <CollapsiblePanel className="page-filter" stickyFooter={this._renderExcelIcon()}>
                <div className="row">
                <div className="col-12 col-md-4 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                            {this._renderDateRange()}
                        </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                        <CheckBox id="IsGetAll"
                            checked={this.props.isGetAll}
                            onChange={(checked) => this.props.changeIsGetAll(checked)}
                            label={LangHelper.getSingleResource("IsGetAll")} />
                    </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
                            <AutoComplete
                                onSelect={(value) => this.props.setUsername(value)}
                                onInput={(value) => this.props.setUsername(value)}
                                htmlAttributes={{placeholder:LangHelper.getSingleResource("ExternalIdOrSystemId")}} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                            {this._renderCurrencySelectList()}
                        </div>
                    </div>    
                    <div className="col-12 col-md-4 col-sm-3 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                            <button type="button" className="btn btn-submit" onClick={this.submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const { setDateRange, changeIsGetAll, setUsername, setSelectedCurrency } = ActionCreators;
    return bindActionCreators(Object.assign({}, {
        setDateRange,
        changeIsGetAll,
        setUsername,
        setSelectedCurrency
    }), dispatch);
}

function mapStateToProps(state) {
    const { dateRange, isGetAll, selectedCurrency, requestParam, username } = state;
    return Object.assign({}, {
        dateRange,
        isGetAll,
        selectedCurrency,
        username,
        requestParam,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);