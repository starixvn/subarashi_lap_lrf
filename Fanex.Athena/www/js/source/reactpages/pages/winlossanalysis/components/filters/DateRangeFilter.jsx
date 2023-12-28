import React, {memo} from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { DateRange } from '@jsroot/components/date-range/index'
import PropTypes from 'prop-types';

export const DateRangeFilter = (props) => {
    const {onChange, isMobile, dateRange} = props;

    const _renderDateRange = () => {
        const dateConstraint = AppData.dateConstraint;

        return (
            <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateConstraint.maxDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={onChange} 
                isMobile={isMobile}/>
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
    onChange: PropTypes.func,
    dateRange: PropTypes.shape({
        fromDate: PropTypes.string,
        toDate: PropTypes.string
    })
};
const defaultProps = {
    isMobile: false
};

DateRangeFilter.propTypes = propTypes;
DateRangeFilter.defaultProps = defaultProps;

export default memo(DateRangeFilter);