import React, { useEffect, useState } from "react";
import LangHelper from "@jsroot/lib/langHelper";
import ReportTitle from "@jsroot/components/ReportTitle";
import { connect } from "react-redux";
import { ShowTextWithDefaultValue } from "../lib/service";
import DataService from "@jsroot/lib/DataService";
import NoDataTitle from "@jsroot/components/NoDataTitle";

const PlayerInformation = (props) => {
    const [url, setUrl] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

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
        sourceOfFunds,
        userName,
    } = props.userInfo;

    useEffect(() => {
        const url = "api/CustomerAdministration/GetKYCInfoByUserName";
        const params = {
            userName: userName,
            // userName: "timmytest",
        };
        setIsFetching(true);
        DataService.getFile(url, params)
            .then(_handleResponse)
            .catch(() => {
                // alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
                setUrl(null);
            })
            .finally(() => {
                setIsFetching(false);
            });
        return () => window.URL.revokeObjectURL(url);
    }, [userName]);

    const _handleResponse = (response) => {
        const contentType = response.headers["content-type"];
        if (contentType && contentType.indexOf("image") > -1) {
            const NoContentStatusCode = 204;
            if (response.status !== NoContentStatusCode) {
                const blob = new Blob([response.data], {
                    type: response.headers["content-type"],
                });
                const url = window.URL.createObjectURL(blob);
                return setUrl(url);
            }
        }
        return setUrl(null);
    };

    const _showKYCImage = () => {
        if (isFetching)
            return (
                <div className='icon-loading'>
                    <div className='loader-inner ball-beat'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );

        return (
            <div className='account-kyc-container'>
                {url ? (
                    <img
                        className='account-kyc-image'
                        src={url}
                        alt='Account KYC'
                    />
                ) : (
                    <NoDataTitle />
                )}
            </div>
        );
    };

    return (
        <div className='account-info-container'>
            <ReportTitle
                content={LangHelper.getSingleResource("PlayerInformation")}
            />
            <div className='side-content page-filter'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                {LangHelper.getSingleResource("GeneralInformation")}
                            </th>
                            <th>{LangHelper.getSingleResource("Value")}</th>
                            <th>{LangHelper.getSingleResource("KYC")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{LangHelper.getSingleResource("FirstName")}</td>
                            <td>{ShowTextWithDefaultValue(firstName)}</td>
                            <td rowSpan='13'>{_showKYCImage()}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("LastName")}</td>
                            <td>{ShowTextWithDefaultValue(lastName)}</td>
                        </tr>
                        <tr>
                            <td>
                                {LangHelper.getSingleResource("PreferredUserName")}
                            </td>
                            <td>
                                {ShowTextWithDefaultValue(preferredUserName)}
                            </td>
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
                            <td>
                                {LangHelper.getSingleResource("Occupation")}
                            </td>
                            <td>{ShowTextWithDefaultValue(occupation)}</td>
                        </tr>
                        <tr>
                            <td>
                                {LangHelper.getSingleResource("SourceOfFunds")}
                            </td>
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
                            <td>
                                {LangHelper.getSingleResource(
                                    "SecurityQuestion"
                                )}
                            </td>
                            <td>
                                {ShowTextWithDefaultValue(securityQuestion)}
                            </td>
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
