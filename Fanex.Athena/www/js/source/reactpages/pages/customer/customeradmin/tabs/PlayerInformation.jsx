import React, { useEffect, useState } from "react";
import LangHelper from "@jsroot/lib/langHelper";
import ReportTitle from "@jsroot/components/ReportTitle";
import DataService from "@jsroot/lib/DataService";
import { connect } from "react-redux";
import { toggleLoader } from "@jsroot/actions/loaderAction";
import { bindActionCreators } from "redux";

const PlayerInformation = (props) => {
    const { custId } = props.userInfo;
    const url = "api/CustomerAdministration/SearchCustomerByCustId";

    const [userInfoDetail, setUserInfoDetail] = useState({});

    useEffect(() => {
        if (!custId) return;

        const params = {
            custId: custId,
        };

        props.toggleLoader(false);

        DataService.postData(url, params)
            .then((response) => {
                setUserInfoDetail({ ...response.data });
                props.toggleLoader(false);
            })
            .catch((error) => {
                console.err(error.message);
                props.toggleLoader(false);
            });
    }, [custId]);

    const {
        firstName,
        lastName,
        gender,
        email,
        mobile,
        active,
        address,
        locked,
        securityQuestion,
        securityCode,
        preferredUserName,
        myPreferredCurrency,
        myPreferredOdds,
    } = userInfoDetail || {};

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
                            <td>{LangHelper.getSingleResource("Active")}</td>
                            <td>{active}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Locked")}</td>
                            <td>{locked}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("Address")}</td>
                            <td>{address}</td>
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
                        <tr>
                            <td>{LangHelper.getSingleResource("MyPreferredCurrency")}</td>
                            <td>{myPreferredCurrency}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource("MyPreferredOdds")}</td>
                            <td>{myPreferredOdds}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { username, userInfo } = state;
    return Object.assign({}, { username, userInfo });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInformation);
