import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'
import LangHelper from '@jsroot/lib/langHelper';
import { DateRange } from '@jsroot/components/date-range/index';
import AppData from '@jsroot/lib/AppData';
import { ActionCreators } from '../actions/index.js';

const RANGE_MONTH_CONSTRAINT = 3;
const dateConstraint = AppData.dateConstraint;
const DEFAULT_PAGE_SIZE = AppData.defaultPageSize;
const DEFAULT_PAGE_INDEX = AppData.defaultPageIndex;

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);
    }

    _renderDateRange = () => {
        return (
            <DateRange startDate={this.props.requestParam.FromDate} endDate={this.props.requestParam.ToDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={this.props.requestParam.ToDate} limitedMonthRange={RANGE_MONTH_CONSTRAINT + 1}
                onChange={this.dateRangeChanged} />
        );
    };

    dateRangeChanged = (date, isValidMonthRange = true) => {
        if (!isValidMonthRange) {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", RANGE_MONTH_CONSTRAINT);
            alert(message);
            return;
        }

        var newRequestParam = {
            FromDate: moment(date.startDate).format("MM/DD/YYYY"),
            ToDate: moment(date.endDate).format("MM/DD/YYYY")
        };

        this.setState({
            requestParam: Object.assign(this.props.requestParam, newRequestParam)
        });
    };

    onSubmit = () => {
        const param = Object.assign({}, this.props.requestParam, { PageSize: DEFAULT_PAGE_SIZE, PageIndex: DEFAULT_PAGE_INDEX });
         this.props.getDetailTransactionReport(param);
    };

    exportExcel = (event) => {
        event.preventDefault();
        const param = Object.assign({}, this.props.requestParam);
        this.props.exportDetailTransactionReport(param);
    };

    render() {
        return (
            <div className='page-filter'>
                <div className='row'>
                    <div className='col-12 col-sm-7 col-md-4 col-xl-3'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource("TransactionDate")}</label>
                            {this._renderDateRange()}
                        </div>
                    </div>
                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" onClick={this.onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>
                    <div className="caret-block">
                        <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
                    </div>
                </div>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    const { setRequestParam, getDetailTransactionReport, exportDetailTransactionReport } = ActionCreators;
    return bindActionCreators({ setRequestParam, getDetailTransactionReport, exportDetailTransactionReport }, dispatch);
}

function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
