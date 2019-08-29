import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
import { licenseeType } from '../../lib/constants';

export const BankInformation = (props) => {
    if (props.licenseeType === licenseeType.api) {
        return null;
    }

    const { licenseeCustId } = props;
    const [data, setData] = useState({});
    const [isShowPlainText, setIsShowPlainText] = useState(false);

    useEffect(() => {
        const param = { licenseeCustId };
        props.getBankInfo(param).then(result => setData(result));
    }, [licenseeCustId]);

    const displayInfo = (value) => isShowPlainText ? value : (value && '*'.repeat(value.length));
    const { BankName, AccountName, AccountNumber } = data || {};

    return (
        <div className="left-side-content bank-infor-container">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="first-cell">Bank Information</td>
                        <td><button onClick={() => setIsShowPlainText(true)} onmouseleave={() => setIsShowPlainText(false)}>Show</button></td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                        <td>{displayInfo(BankName)}</td>
                    </tr>
                    <tr>
                        <td>Bank Account Name</td>
                        <td>{displayInfo(AccountName)}</td>
                    </tr>
                    <tr>
                        <td>Bank Account Number</td>
                        <td>{displayInfo(AccountNumber)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { getBankInfo } = ActionCreators;
    return bindActionCreators({ getBankInfo }, dispatch);
}

function mapStateToProps(state) {
    const { licenseeCustId, licenseeType } = state;
    return Object.assign({}, { licenseeCustId, licenseeType });
};

export default connect(mapStateToProps, mapDispatchToProps)(BankInformation);