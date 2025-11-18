import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types'

export const Note = (props) => {
    return (
        <>
            <div className="col-12 note">
                {LangHelper.getSingleResource('Note')}:
            </div>
            <div className={props.contentClass}>
                {AppData.isAllowTxIDColumn && <>
                    * {LangHelper.getSingleResource('BettingTicketCenter_RefnoTabNote_TxIDSearch').replace('{0}', AppData.balanceupDay)}
                    <br />
                    * {AppData.productsRequireTxIdNote}
                    <br />
                </>}
                {AppData.productsRequireUseNameNote && <>
                    * {LangHelper.getSingleResource('BettingTicketCenter_RefnoTabNote2')
                        .replace('{0}', AppData.productsRequireUseNameNote)
                        .replace('{1}', AppData.balanceupDay)}
                    <br />
                </>}
                * {LangHelper.getSingleResource('BettingTicketCenter_RefnoTabNote3')
                        .replace('{0}', AppData.balanceupDay)}
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

export default memo(Note);