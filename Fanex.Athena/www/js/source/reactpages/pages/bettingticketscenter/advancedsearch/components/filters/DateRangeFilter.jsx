import React, { memo } from 'react'
import {  shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import { DateRange } from '@jsroot/components/date-range/index'
import Service from '../../../common/lib/Service';
import useIsEnableLeagueMatch from '../hooks/useIsEnableLeagueMatch.jsx'
import PropTypes from 'prop-types';


export const DateRangeFilter = (props) => {
    const dispatch = useDispatch();
    const [dateRange, selectedProduct, selectedSport] = useSelector(state => [state.dateRange, state.selectedProduct, state.selectedSport], shallowEqual);
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const {setDateRange, getBettypeList, getLeagueList} = ActionCreators;

    const _onChangeDateRange = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
            dispatch(getBettypeList(selectedProduct, Service.isSingleDate({ fromDate: date.startDate, toDate: date.endDate })));
            if (isEnableLeagueMatch) {
                dispatch(getLeagueList(selectedSport, date.startDate));
            }
        }
        else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateRange = () => {
        const dateConstraint = AppData.dateConstraint;

        return (
            <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={_onChangeDateRange} 
                isMobile={props.isMobile}/>
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