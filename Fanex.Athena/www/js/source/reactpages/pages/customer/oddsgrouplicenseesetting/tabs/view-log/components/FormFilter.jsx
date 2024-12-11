import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { GetData } from '../lib/queryService'
import { DateRange } from '@jsroot/components/date-range/index'
import Site from '@jsroot/lib/site'
import { DefaultPagingOption } from '../lib/constants';

export class FormFilter extends Component {
    constructor(props) {
        super(props);
    }

    submit = async (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        this.props.toggleLoader(true);
        var data = await GetData(params);
        !!data && this.props.setData(data);
        this.props.setSelectedParams(params);
        this.props.toggleLoader(false);
    }

    _getParams() {
        const { fromDate, toDate } = this.props.dateRange;

        return {
            StartDate: Site.convertDateToString(fromDate),
            EndDate: Site.convertDateToString(toDate),
            PageSize: DefaultPagingOption.PageSize,
            PageIndex: DefaultPagingOption.PageIndex
        };
    }


    _applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            this.props.setDateRange(date);
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }


    _renderDateRange = () => {
        const dateConstraint = AppData.dateConstraint;
        const dateRange =  this.props.dateRange;

        return (
            <DateRange 
                startDate={dateRange.fromDate} 
                endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} 
                maxDate={dateConstraint.maxDate}
                today={dateRange.toDate}
                onChange={this._applyDateRangeHandler}/>
        )
    }

    render() {
        return (
            <div className='page-filter'>
                <div className='row'>
                    <div className='col-12 col-sm-4 col-md-3 col-xl-2'>
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                            {this._renderDateRange()}
                        </div>
                    </div>
                    <div className='col-12 col-sm-3 col-md-2 col-xl-1'>
                        <div className='form-group button-group'>
                            <button type='button' className='btn btn-submit'
                                disabled={!this.props.dateRange}
                                onClick={this.submit}>{LangHelper.getSingleResource('Submit')}</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    const { ...rest } = state;
    return Object.assign({}, rest);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);