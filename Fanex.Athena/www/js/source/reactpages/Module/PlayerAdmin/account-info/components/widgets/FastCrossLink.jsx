import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { systemType } from '../../../../constants/configInfo';

export const FastCrossLink = (props) => {
    const { userName, getLink } = props;
    const singleCustomerActionLink = `PlayerBtcSingleCustomer/Index?userName=${userName}`;
    const singleCustomerUrl = getLink(systemType.lrf, singleCustomerActionLink);

    return (
        <div className="panel">
            <div className="panel-header">Fast Cross-Link</div>
            <div className="panel-body">
                <div>
                    <span><a className="link" href="#">Betting Ticket Center</a></span>
                    <strong className="divider">></strong>
                    <span><a className="link" href={singleCustomerUrl} target="_blank">Single Customer</a></span>
                </div>
                <div><span><a className="link" href="#">Customer Win Loss</a></span></div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { getLink } = ActionCreators;
    return bindActionCreators({ getLink }, dispatch);
}

function mapStateToProps(state) {
    const { userName } = state;
    return Object.assign({}, { userName });
};

export default connect(mapStateToProps, mapDispatchToProps)(FastCrossLink);