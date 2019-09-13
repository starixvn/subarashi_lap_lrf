import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
import ClientResourceManager from '@jsroot/lib/clientResourceManager';

export const ActivityRecord = ({ ibcCustId, getActivityRecord }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data === null) {
            const param = { ibcCustId };
            getActivityRecord(param).then(result => setData(result));
        }
    }, [ibcCustId]);

    const { CreatedDateString, LastLoginString, LastTxn,
        LastUpdateBAString, BAUpdatedBy, LastUpdateSpecialLevelString, SpecialLevelUpdateBy } = data || {};

    return (
        <div className="left-side-content activity-record-container">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="first-cell">{ClientResourceManager.getText('CreatedDate')}</td>
                        <td>{CreatedDateString}</td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('LastLogin')}</td>
                        <td>{LastLoginString}</td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('LastTxn')}</td>
                        <td>{LastTxn}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('BAUpdatedBy')}</td>
                        <td>{BAUpdatedBy}</td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('LastUpdatedBy')}</td>
                        <td>{LastUpdateBAString}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('SpecialLevel')}</td>
                        <td>{SpecialLevelUpdateBy}</td>
                    </tr>
                    <tr>
                        <td>{ClientResourceManager.getText('LastUpdatedSpecialLevel')}</td>
                        <td>{LastUpdateSpecialLevelString}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { getActivityRecord } = ActionCreators;
    return bindActionCreators({ getActivityRecord }, dispatch);
}

function mapStateToProps(state) {
    const { ibcCustId } = state;
    return Object.assign({}, { ibcCustId });
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityRecord);