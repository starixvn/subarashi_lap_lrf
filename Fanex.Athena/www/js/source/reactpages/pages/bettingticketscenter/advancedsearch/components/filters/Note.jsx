import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types'
import AppData from '@jsroot/lib/AppData'

export const Note = (props) => {
    return (
        <>
            <div className="col-12 col-md-3 col-xl-1 note">
                {LangHelper.getSingleResource('Note')}:
            </div>
            <div className={props.contentClass}>
                * {LangHelper.getSingleResource('BettingTicketCenter_AdvancedSearchTabNote1')}
                <br />
                * {LangHelper.getSingleResource('BettingTicketCenter_AdvancedSearchTabNote2').replace("{0}", AppData.dateConstraint.limitedMonthRange)}
            </div>
        </>)
}

const propTypes = {
    noteClass: PropTypes.string,
    contentClass: PropTypes.string
}
const defaultProps = {
    contentClass: "col-9"
};

Note.propTypes = propTypes;
Note.defaultProps = defaultProps;

export default memo(Note);