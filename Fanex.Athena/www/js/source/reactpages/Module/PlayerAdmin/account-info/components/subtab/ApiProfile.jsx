import React from 'react';

const ApiProfile = ({ data }) => {
    const { MemberId, FirstName, LastName, OperatorId, SiteCode, ProductCode,
        CustomInfo1, CustomInfo2, CustomInfo3, CustomInfo4, CustomInfo5 } = data || {};

    return (
        <tbody>
            <tr>
                <td className="first-cell">Member ID</td>
                <td>{MemberId}</td>
            </tr>
            <tr>
                <td>First name</td>
                <td>{FirstName}</td>
            </tr>
            <tr>
                <td>Last name</td>
                <td>{LastName}</td>
            </tr>
            <tr>
                <td>Operator ID</td>
                <td>{OperatorId}</td>
            </tr>
            <tr>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>Site code</td>
                <td>{SiteCode}</td>
            </tr>
            <tr>
                <td>Product code</td>
                <td>{ProductCode}</td>
            </tr>
            <tr>
                <td colSpan="2"></td>
            </tr>
            <tr>
                <td>CustomInfo 1</td>
                <td>{CustomInfo1}</td>
            </tr>
            <tr>
                <td>CustomInfo 2</td>
                <td>{CustomInfo2}</td>
            </tr>
            <tr>
                <td>CustomInfo 3</td>
                <td>{CustomInfo3}</td>
            </tr>
            <tr>
                <td>CustomInfo 4</td>
                <td>{CustomInfo4}</td>
            </tr>
            <tr>
                <td>CustomInfo 5</td>
                <td>{CustomInfo5}</td>
            </tr>
        </tbody>
    );
}

export default ApiProfile;