import React from 'react';

export const BankInformation = () => {
    return (
        <div className="left-side-content bank-infor-container">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="first-cell">Bank Information</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                        <td>********</td>
                    </tr>
                    <tr>
                        <td>Bank Account Name</td>
                        <td>********</td>
                    </tr>
                    <tr>
                        <td>Bank Account Number</td>
                        <td>********</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BankInformation;