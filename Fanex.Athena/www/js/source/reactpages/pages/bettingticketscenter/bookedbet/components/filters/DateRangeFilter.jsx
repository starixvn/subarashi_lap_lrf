import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { DateRange } from '@jsroot/components/date-range/index'
import PropTypes from 'prop-types';

export const DateRangeFilter = (props) => {
    const dispatch = useDispatch();
    const {dateRange} = useSelector(state => state);
    const {setDateRange} = ActionCreators;

    const _applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateRange = () => {
        const dateConstraint = AppData.dateConstraint;

        return (
            <div className={props.disabled ? 'datepicker-disabled' : ''}>
                <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    today={dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                    onChange={_applyDateRangeHandler} 
                    isMobile={props.isMobile}/>
            </div>
        )
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
        {_renderDateRange()}
    </div>)
}

const propTypes = {
    isMobile: PropTypes.bool,
};
const defaultProps = {
    isMobile: false
};

DateRangeFilter.propTypes = propTypes;
DateRangeFilter.defaultProps = defaultProps;

export default memo(DateRangeFilter);