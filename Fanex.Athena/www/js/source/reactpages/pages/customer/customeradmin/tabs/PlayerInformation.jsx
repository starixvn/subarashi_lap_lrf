import React, { useEffect } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import ReportTitle from '@jsroot/components/ReportTitle';
import { connect } from 'react-redux';

const PlayerInformation = (props) => {

    useEffect(() => {

    }, [props.username])

    var data = {};
    
    const { FirstName, LastName, Gender, Email, Mobile, Active, Address, Locked,
        SecurityQuestion, SecurityCode, PreferredUserName, MyPreferredCurrency, MyPreferredOdds } = data || {};

    return (
        <div className="account-info-container">
            <ReportTitle content={LangHelper.getSingleResource('PlayerInformation')} />
            <div className='side-content page-filter'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{LangHelper.getSingleResource('GeneralInformation')}</th>
                            <th>{LangHelper.getSingleResource('Value')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="first-cell">{LangHelper.getSingleResource('FirstName')}</td>
                            <td>{FirstName}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('LastName')}</td>
                            <td>{LastName}</td>
                        </tr>
                        <tr>
                        <td>{LangHelper.getSingleResource('PreferredUserName')}</td>
                            <td>{PreferredUserName}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Gender')}</td>
                            <td>{Gender}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Email')}</td>
                            <td>{Email}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Mobile')}</td>
                            <td>{Mobile}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Active')}</td>
                            <td>{Active}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Locked')}</td>
                            <td>{Locked}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('Address')}</td>
                            <td>{Address}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('SecurityQuestion')}</td>
                            <td>{SecurityQuestion}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('SecurityCode')}</td>
                            <td>{SecurityCode}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('MyPreferredCurrency')}</td>
                            <td>{MyPreferredCurrency}</td>
                        </tr>
                        <tr>
                            <td>{LangHelper.getSingleResource('MyPreferredOdds')}</td>
                            <td>{MyPreferredOdds}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    const { username } = state;
    return Object.assign({}, { username });
};

export default connect(mapStateToProps,)(PlayerInformation);