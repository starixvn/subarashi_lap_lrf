import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types'

export const Note = (props) => {
    return (
        <>
            <div className="col-1" style={{ flex: "0 0 5%" }}>
                {LangHelper.getSingleResource('Note')}:
            </div>
            <div className={props.contentClass}>
                * {LangHelper.getSingleResource('BettingTicketCenter_AdvancedSearchTabNote1')}
                <br />
                * {LangHelper.getSingleResource('BettingTicketCenter_AdvancedSearchTabNote2').replace("{0}", AppData.dateConstraint.minDate)}
            </div>
        </>)
}

const propTypes = {
    contentClass: PropTypes.string
}
const defaultProps = {
    contentClass: "col-9"
};

Note.propTypes = propTypes;
Note.defaultProps = defaultProps;

export default Note;