import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import { bindActionCreators } from 'redux';

export const AccountProfile = (props) => {
    return (
        <div className="left-side-content account-profile-container">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="first-cell">AG UserID</td>
                        <td>qatest01</td>
                    </tr>
                    <tr>
                        <td>Gold Deluxe UserID</td>
                        <td>qatest01</td>
                    </tr>
                    <tr>
                        <td>VoidBridge UserID</td>
                        <td>qatest01</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>First name</td>
                        <td>qatest01</td>
                    </tr>
                    <tr>
                        <td>Last name</td>
                        <td>101</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>Male</td>
                    </tr>
                    <tr>
                        <td>Date of birth</td>
                        <td>34335</td>
                    </tr>
                    <tr>
                        <td>Mobile</td>
                        <td>111</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>Togo</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>City/ Town</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>33</td>
                    </tr>
                    <tr>
                        <td>Zip Code</td>
                        <td>44</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { getAccountInfo } = ActionCreators;
    return bindActionCreators({ getAccountInfo }, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);