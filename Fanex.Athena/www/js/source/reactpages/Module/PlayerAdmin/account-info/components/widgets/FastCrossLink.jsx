import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { systemType } from '../../../../constants/configInfo';
import Popup from '@jsroot/components/popup';

const defaultPopupInfo = {url: null, title: null, width: 0, height: 0};

export const FastCrossLink = (props) => {
    const { userName, currencyName, getLink } = props;

    const singleCustomerActionLink = `PlayerBtcSingleCustomer?userName=${userName}&currencyName=${currencyName}`;
    const singleCustomerUrl = getLink(systemType.lrf, singleCustomerActionLink);

    const customerWinLossActionLink = `PlayerWinLoss?userName=${userName}&currencyName=${currencyName}`;
    const customerWinLossUrl = getLink(systemType.lrf, customerWinLossActionLink);
    const [popupInfo, setPopupInfo] = useState(defaultPopupInfo);
    const isShowPopup = !!popupInfo.url;

    const handleClickLink = (event, popup) => {
        event.preventDefault();
        setPopupInfo(popup);
    }

    const popupSingleCustomer = {
        url: singleCustomerUrl, 
        title: 'Betting Ticket Center - Single Customer',
        width: window.innerWidth - 10,
        height: window.innerHeight - 10
    };
    const popupCustomerWinLoss = {
        url: customerWinLossUrl, 
        title: 'Customer Win Loss',
        width: window.innerWidth - 10,
        height: 300
    };

    return (
        <div className="panel">
            <div className="panel-header">Fast Cross-Link</div>
            <div className="panel-body">
                <div>
                    <span><a className="link" href="#">Betting Ticket Center</a></span>
                    <strong className="divider">></strong>
                    <span><a className="link" onClick={(e) => handleClickLink(e, popupSingleCustomer)}>Single Customer</a></span>
                </div>
                <div><span><a className="link" onClick={(e) => handleClickLink(e, popupCustomerWinLoss)}>Customer Win Loss</a></span></div>
            </div>

            <Popup isShow={isShowPopup} 
                            iframeUrl={popupInfo.url}
                            title={popupInfo.title}
                            width={popupInfo.width} height={popupInfo.height}
                            onClose={() => setPopupInfo(defaultPopupInfo)} />
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { getLink } = ActionCreators;
    return bindActionCreators({ getLink }, dispatch);
}

function mapStateToProps(state) {
    const { userName, currencyName } = state;
    return Object.assign({}, { userName, currencyName });
};

export default connect(mapStateToProps, mapDispatchToProps)(FastCrossLink);