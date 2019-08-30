import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import { bindActionCreators } from 'redux';

export const ActivityRecord = ({ ibcCustId, getActivityRecord }) => {
    const [data, setData] = useState(null);
    console.log(data);

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
                        <td className="first-cell">Created Date</td>
                        <td>{CreatedDateString}</td>
                    </tr>
                    <tr>
                        <td>Last Login</td>
                        <td>{LastLoginString}</td>
                    </tr>
                    <tr>
                        <td>Last Txn</td>
                        <td>{LastTxn}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>BA Updated By</td>
                        <td>{BAUpdatedBy}</td>
                    </tr>
                    <tr>
                        <td>Last Updated BA</td>
                        <td>{LastUpdateBAString}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>Special Level</td>
                        <td>{SpecialLevelUpdateBy}</td>
                    </tr>
                    <tr>
                        <td>Last Updated Special Level</td>
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