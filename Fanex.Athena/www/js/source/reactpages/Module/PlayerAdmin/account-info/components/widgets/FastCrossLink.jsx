import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { systemType } from '../../../../constants/configInfo';
import Popup from '@jsroot/components/popup';

export const FastCrossLink = (props) => {
    const { userName, currencyName, getLink } = props;
    const singleCustomerActionLink = `PlayerBtcSingleCustomer/Index?userName=${userName}&currencyName=${currencyName}`;
    const singleCustomerUrl = getLink(systemType.lrf, singleCustomerActionLink);

    const [popupInfo, setPopupInfo] = useState({url: null, title: null});
    const isShowPopup = !!popupInfo.url;

    const handleClickSingleCustomer = (event) => {
        event.preventDefault();
        setPopupInfo({url: singleCustomerUrl, title: 'Betting Ticket Center - Single Customer'});
    }

    const popupWidth = window.innerWidth - 10;
    const popupHeight = window.innerHeight - 10;

    return (
        <div className="panel">
            <div className="panel-header">Fast Cross-Link</div>
            <div className="panel-body">
                <div>
                    <span><a className="link" href="#">Betting Ticket Center</a></span>
                    <strong className="divider">></strong>
                    <span><a className="link" onClick={handleClickSingleCustomer}>Single Customer</a></span>
                </div>
                <div><span><a className="link" href="#">Customer Win Loss</a></span></div>
            </div>

            <Popup isShow={isShowPopup} 
                            iframeUrl={popupInfo.url}
                            title={popupInfo.title}
                            width={popupWidth} height={popupHeight}
                            onClose={() => setPopupInfo({url: null, title: null})} />
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