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
    const [data, setData] = useState(null);
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
                        <td className="first-cell">
                        Bank Information
                        <button className="btn-default btn-link btn-icon"
                                onClick={() => setIsShowPlainText(true)} 
                                onMouseLeave={() => setIsShowPlainText(false)}>
                            <i class="material-icons">remove_red_eye</i>
                            </button>
                        </td>
                        <td></td>
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