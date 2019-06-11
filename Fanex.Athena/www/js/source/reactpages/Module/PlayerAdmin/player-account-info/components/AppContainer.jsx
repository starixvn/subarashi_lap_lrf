import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions/index'
import AppLayout from '../../../../layouts/AppLayout'
import AccountProfile from './AccountProfile';
import CustomerBettingStatus from './CustomerBettingStatus';
import FastCrossLink from './FastCrossLink';

const AppContainer = (props) => {
    return (
        <AppLayout>
            <div className="account-info-container">
                <div className="outer-col-1">
                    <div className="account-profile-container"><AccountProfile /></div>
                </div>
                <div className="outer-col-2">
                    <div className="cust-betting-container"><CustomerBettingStatus /></div>
                    <div className="fast-cross-link-container"><FastCrossLink /></div>
                </div>
            </div>
        </AppLayout>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppContainer));