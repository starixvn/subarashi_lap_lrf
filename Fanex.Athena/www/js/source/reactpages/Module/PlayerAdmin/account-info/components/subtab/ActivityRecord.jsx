import React from 'react';

export const ActivityRecord = () => {
    return(
        <div className="left-side-content activity-record-container">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="first-cell">Created Date</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Login</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Txn</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Date of Registration</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>BA Updated By</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Updated BA</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>Special Level</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Updated Special Level</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ActivityRecord;