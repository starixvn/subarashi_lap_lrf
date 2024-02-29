import React from "react";
import LangHelper from "@jsroot/lib/langHelper";
import ReportTitle from "@jsroot/components/ReportTitle";
import { connect } from "react-redux";
import { ShowTextWithDefaultValue } from '../lib/service'

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
                            <td>{ShowTextWithDefaultValue(firstName)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("LastName")}</td>
                            <td>{ShowTextWithDefaultValue(lastName)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("PreferredUserName")}</td>
                            <td>{ShowTextWithDefaultValue(preferredUserName)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Gender")}</td>
                            <td>{ShowTextWithDefaultValue(gender)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Email")}</td>
                            <td>{ShowTextWithDefaultValue(email)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Mobile")}</td>
                            <td>{ShowTextWithDefaultValue(mobile)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Address")}</td>
                            <td>{ShowTextWithDefaultValue(address)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Occupation")}</td>
                            <td>{ShowTextWithDefaultValue(occupation)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("SourceOfFunds")}</td>
                            <td>{ShowTextWithDefaultValue(sourceOfFunds)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Active")}</td>
                            <td>{ShowTextWithDefaultValue(active)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Locked")}</td>
                            <td>{ShowTextWithDefaultValue(locked)}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("SecurityQuestion")}</td>
                            <td>{ShowTextWithDefaultValue(securityQuestion)}</td>
                        </tr>
                        <tr>
                            <td>
                                {LangHelper.getSingleResource("SecurityCode")}
                            </td>
                            <td>{ShowTextWithDefaultValue(securityCode)}</td>
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
