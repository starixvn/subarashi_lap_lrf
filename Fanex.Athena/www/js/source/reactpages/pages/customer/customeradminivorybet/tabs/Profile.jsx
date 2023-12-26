import React from "react";
import LangHelper from "@jsroot/lib/langHelper";
import ReportTitle from "@jsroot/components/ReportTitle";
import { connect } from "react-redux";

const Profile = (props) => {
    const {
        gender,
        email,
        mobile,
        active,
        locked,
        registeredUserName,
        registeredDateString,
        occupation,
        nationality,
        address,
        dobDateString,
        ip
    } = props.userInfo;

    return (
        <div className='account-info-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>{LangHelper.getSingleResource("GeneralInformation")}</th>
                        <th>{LangHelper.getSingleResource("Value")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='first-cell'>{LangHelper.getSingleResource("RegisteredName")}</td>
                        <td>{registeredUserName}</td>
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
                        <td>{LangHelper.getSingleResource("Active")}</td>
                        <td>{active}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("Locked")}</td>
                        <td>{locked}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("DateOfRegistration")}</td>
                        <td>{registeredDateString}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("RegistrationIP")}</td>
                        <td><span className='user-info'>{ip}</span></td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("DateOfBirth")}</td>
                        <td>{dobDateString}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("CurrentAddress")}</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("Nationality")}</td>
                        <td>{nationality}</td>
                    </tr>
                    <tr>
                        <td>{LangHelper.getSingleResource("Occupation")}</td>
                        <td>{occupation}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

function mapStateToProps(state) {
    const { username, userInfo } = state;
    return Object.assign({}, { username, userInfo });
}

export default connect(mapStateToProps)(Profile);
