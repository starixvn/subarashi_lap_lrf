import React, { Component } from 'react';
import DataService from '@jsroot/lib/DataService';
import BetList from './lib/BetList';
import Popup from '@jsroot/components/popup';
import PropTypes from 'prop-types';

class BetListLayout extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isShowPopup : false,
            popupUrl: null,
            popupTitle: null
        };

    }

    componentDidMount() {
        window.onload = () => {
            window.logOpenBetlistEvent && window.logOpenBetlistEvent(this.props.pageName);
        };
        
        window.ViewResult = (...args) => {
            const url = BetList.getResultUrl.apply(BetList, [this.props.rootUrl, ...args]);
            this._openPopup(url, this._getResource('Result'));
        };

        window.showMP = (transId) => {
            let divEvent = document.querySelector('#divEvent_' + transId);
            divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket
            this._showMixParlayDetail(transId, divEvent);
        };

        window.showCombMP = (transId, index) => {
            let divEvent = document.querySelector('#divEvent_' + transId + '' + index);
            divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket
            this._showMixParlayDetail(transId, divEvent);
        };

        // expand choice content
        window.showNewCombMP = (...args) => {
            this._showNewParlayDetail.apply(this, [this.props.rootUrl, ...args]);
        };

        // show detail popup (in choice column)
        window.showCombMPDetail = (transId, refNo, betId, custId, betTeam, baseCurrency) => {
            const { rootUrl } = this.props;

            const url = BetList.getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency);
            this._openPopup(url, betTeam);
        };

        window.ViewCashOutHistory = (transId, refNo, betType, betdaqId) => {
            const { rootUrl, baseCurrency } = this.props;

            const { url, isCashOut } = BetList.getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId);
            const title = this._getResource(isCashOut ? 'CashOutDetails' : 'BoughtDetails');
            this._openPopup(url, title);
        }

        window.ShowBonusDetails = (refCode, transId) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency);

            const title = this._getResource('TransactionDetail');
            this._openPopup(url, title);
        }

        window.showAGCasinoDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('AGCasino') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showRnGCasinoDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductCS') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showVoidBridgeDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductVB') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showTodayRunningBetsDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductAB') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showColossusBetsDetails = (refNo, winlostDate, transId, custId, betCheck) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck);
            const title = this._getResource('TicketDetailOf').replace('{0}', refNo);

            this._openPopup(url, title);
        }

        window.showGlobalGaming = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductFW') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showPPDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductPP') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }

        window.showVideoPokerGameDetails = (transId, winlostDate, custId, transType) => {
            const { rootUrl, baseCurrency } = this.props;

            const url = BetList.getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType);
            const title = this._getResource('ProductCC') + ' - ' +
                this._getResource('DetailedBetlist') + ' - ' + this._formatDateString(winlostDate);

            this._openPopup(url, title);
        }
    }

    componentWillUnmount() {
        window.showMP = undefined;
        window.showCombMP = undefined;
        window.ViewResult = undefined;
        window.showNewCombMP = undefined;
        window.showCombMPDetail = undefined;
        window.ViewCashOutHistory = undefined;
        window.ShowBonusDetails = undefined;
        window.showAGCasinoDetails = undefined;
        window.showRnGCasinoDetails = undefined;
        window.showVoidBridgeDetails = undefined;
        window.showTodayRunningBetsDetails = undefined;
        window.showColossusBetsDetails = undefined;
        window.showGlobalGaming = undefined;
        window.showPPDetails = undefined;
    }

    _getResource(key) {
        return this.props.getResourceFunc ? this.props.getResourceFunc(key) : key;
    }

    _formatDateString(dateString) {
        return this.props.formatDateStringFunc ? this.props.formatDateStringFunc(dateString) : dateString;
    }

    _beforeShowParlay() {
        this.props.beforeShowParlayFunc && this.props.beforeShowParlayFunc();
    }

    _afterShowParlay() {
        this.props.afterShowParlayFunc && this.props.afterShowParlayFunc();
    }

    _resolveClientUrl(relativeUrl) {
        return this.props.rootUrl + relativeUrl;
    }

    _showMixParlayDetail(transId, divEvent) {
        if (divEvent.style.display === 'none') {
            const url = this._resolveClientUrl('api/MixParlayBetList/Detail?transId=' + transId);
            this._beforeShowParlay();// this.props.toggleLoader(true);

            DataService.getData(url)
                .then((result) => {
                    let choice = '';
                    const length = result.data.length;
                    for (let i = 0; i < length; i++) {
                        choice += result.data[i];
                        if (i < length - 1) {
                            choice += '<div class="line"></div>';
                        }
                    }

                    this._afterShowParlay();// this.props.toggleLoader(false);
                    divEvent.innerHTML = choice;
                    divEvent.style.display = 'block';
                }).catch(function (error) {
                    console.log(error);
                });
        }
        else {
            divEvent.style.display = 'none';
            divEvent.innerHTML = '';
        }
    }

    _showNewParlayDetail(rootUrl, transId, transIndex, refNo, handicap1, handicap2, betcheck, betteam, custId) {
        let divEvent = document.querySelector('#divEvent_' + transId + '' + transIndex);
        let nameDiv = document.querySelector('#combinationOfferName_' + transId + transIndex);

        divEvent.classList.add('mx-parlay'); //to make line-through for void-parlay-ticket

        if (divEvent.style.display == 'none') {
            let url = BetList.getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId);
            this._beforeShowParlay();//this.props.toggleLoader(true);
            DataService.getData(url)
               .then((result) => {       
                   let choice = BetList.buildChoiceParlayDetail(result.data);

                   divEvent.innerHTML = choice;
                   divEvent.style.display = 'block';
                   nameDiv.style.display = 'none';

                   this._afterShowParlay();// this.props.toggleLoader(false);
               }).catch(function (error) {
                   console.log(error);
               });
        }
        else {
            divEvent.style.display = 'none';
            divEvent.innerHTML = '';
            nameDiv.style.display = 'block';
        }
    }

    _openPopup(url, title) {
        this.setState({ isShowPopup: true, popupUrl: url, popupTitle: title});
    }

    _closePopup(){
        this.setState({ isShowPopup: false });
    }

    render() {
        return (
            <div className="betlist-layout">
                 {this.props.children}
                 {this.state.isShowPopup &&
                    <Popup isShow={true} 
                            iframeUrl={this.state.popupUrl}
                            title={this.state.popupTitle}
                            width={900} height={600}
                            onClose={() => this._closePopup()}
                        >
                    </Popup>}
            </div>
        );
    }
}

BetListLayout.propTypes = {
    pageName: PropTypes.string.isRequired,
    rootUrl: PropTypes.string.isRequired,
    getResourceFunc: PropTypes.func,
    baseCurrency: PropTypes.string,
    beforeShowParlayFunc: PropTypes.func,
    afterShowParlayFunc: PropTypes.func,
    formatDateStringFunc: PropTypes.func
}

BetListLayout.defaultProps = {
    rootUrl: '/',
    baseCurrency: ''
}

export default BetListLayout