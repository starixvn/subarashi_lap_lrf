import React from "react";
import LangHelper from "@jsroot/lib/langHelper";
import ReportTitle from "@jsroot/components/ReportTitle";
import { connect } from "react-redux";

const PlayerInformation = (props) => {
    const {
        firstName,
        lastName,
        gender,
        email,
        mobile,
        active,
        locked,
        securityQuestion,
        securityCode,
        preferredUserName,
        address,
        occupation,
        sourceOfFunds
    } = props.userInfo;

    return (
        <div className='account-info-container'>
            <ReportTitle
                content={LangHelper.getSingleResource("PlayerInformation")}
            />
            <div className='side-content page-filter'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>{LangHelper.getSingleResource("GeneralInformation")}</th>
                            <th>{LangHelper.getSingleResource("Value")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='first-cell'>{LangHelper.getSingleResource("FirstName")}</td>
                            <td>{firstName}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("LastName")}</td>
                            <td>{lastName}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("PreferredUserName")}</td>
                            <td>{preferredUserName}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Gender")}</td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Email")}</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Mobile")}</td>
                            <td>{mobile}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Address")}</td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Occupation")}</td>
                            <td>{occupation}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("SourceOfFunds")}</td>
                            <td>{sourceOfFunds}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Active")}</td>
                            <td>{active}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Locked")}</td>
                            <td>{locked}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("SecurityQuestion")}</td>
                            <td>{securityQuestion}</td>
                        </tr>
                        <tr>
                            <td>
                                {LangHelper.getSingleResource("SecurityCode")}
                            </td>
                            <td>{securityCode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { username, userInfo } = state;
    return Object.assign({}, { username, userInfo });
}

export default connect(mapStateToProps)(PlayerInformation);
