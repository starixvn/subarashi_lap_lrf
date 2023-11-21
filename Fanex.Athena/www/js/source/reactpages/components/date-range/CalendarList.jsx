import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.js';
import { MomentFormat } from './constants';

const CalendarList = (props) => {
    const {
        format,
        linkedCalendars,
        firstDayOfWeek,
        minDate,
        maxDate,
        classNames,
        onlyClasses,
        specialDays,
        lang,
        disableDaysBeforeToday,
        showMonthArrow,
        range,
        link,
        styles,
        calendarsCount,
        locale,
        linkCB,
        onChange } = props;

    const calendars = [];
    for (let i = calendarsCount; i >= 0; i--) {
        const shownDate = i == calendarsCount ? range.startDate : range.endDate;
        calendars.push(
            <Calendar
                showMonthArrow={showMonthArrow}
                shownDate={shownDate}
                disableDaysBeforeToday={disableDaysBeforeToday}
                lang={lang}
                key={i + shownDate.month().toString() + shownDate.year().toString()}
                link={linkedCalendars && link}
                linkCB={linkCB}
                range={range}
                format={format}
                firstDayOfWeek={firstDayOfWeek}
                theme={styles}
                minDate={minDate}
                maxDate={maxDate}
                onlyClasses={onlyClasses}
                specialDays={specialDays}
                classNames={classNames}
                onChange={onChange}
                locale={locale} />
        );
    }
    return calendars
}

CalendarList.defaultProps = {
    format: MomentFormat.default,
    theme: {},
    showMonthArrow: true,
    disableDaysBeforeToday: false,
    onlyClasses: false,
    classNames: {},
    specialDays: [],
  }
  
  CalendarList.propTypes = {
    showMonthArrow: PropTypes.bool,
    disableDaysBeforeToday: PropTypes.bool,
    lang: PropTypes.string,
    range: PropTypes.shape({
      startDate: PropTypes.object,
      endDate: PropTypes.object
    }),
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    date: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
    format: PropTypes.string.isRequired,
    firstDayOfWeek: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    link: PropTypes.oneOfType([PropTypes.shape({
      startDate: PropTypes.object,
      endDate: PropTypes.object,
    }), PropTypes.bool]),
    linkCB: PropTypes.func,
    onlyClasses: PropTypes.bool,
    specialDays: PropTypes.array,
    classNames: PropTypes.object,
    locale: PropTypes.object,
    calendarsCount: PropTypes.number
  }

export default CalendarList;