import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../action/index.js'
import { bindActionCreators } from 'redux'
import { DateRange } from '../../../../components/date-range/index'
import LangHelper from '../../../../lib/langHelper'
import AppData from '@jsroot/lib/AppData'

const FormFilter = (props) => {
    const RANGE_MONTH_CONSTRAINT = 3;

    const [dateRange, setDateRange] = useState({ fromDate: props.requestParam.fromDate, toDate: props.requestParam.toDate });
    const dateConstraint = AppData.dateConstraint;
    
    const onSubmit = () => {
        const param = Object.assign({}, props.requestParam, dateRange);

        props.setRequestParam(param);
    }

    const applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            setDateRange(date);
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", RANGE_MONTH_CONSTRAINT);
            alert(message);
        }
    }

    const _renderDateRange = () => {
        return (
            <DateRange fromDate={dateRange.fromDate} toDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateRange.toDate} limitedMonthRange={RANGE_MONTH_CONSTRAINT}
                onChange={applyDateRangeHandler} />
        );
    }

    return (
        <div className='page-filter'>
            <div className='row'>
                <div className='col-12 col-sm-7 col-md-4 col-xl-3'>
                    <div className='form-group'>
                        <label className='label-text'>Transaction date</label>
                        {_renderDateRange()}
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" onClick={onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam } = ActionCreators;
    return bindActionCreators({ setRequestParam }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);