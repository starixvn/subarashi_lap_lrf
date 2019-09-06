import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { heightSlicing, excludedTabNameWithNonDepositAndArchived } from '../lib/constants';
import { systemType as systemTypeConfig } from '../../../constants/configInfo';

export class PlayerDetail extends PureComponent {
    constructor(props) {
        super(props);
        this._tabList = this.props.getTabList();
    }

    _getDefaultSelectedTab() {
        return this._tabList && this._tabList.length && this._tabList[0].Name;
    }

    handleClickMenu = (event, tabName) => {
        event.preventDefault();
        this.props.setSelectedTabName(tabName);
    }

    _buildActionUrl(systemType, action) {
        const { selectedPlayer } = this.props;
        const { ibcCustId, licenseeCustId, currencyId, currency, userName } = selectedPlayer;
        const custIdQueryString = systemType === systemTypeConfig.lrf ? `custId=${ibcCustId}` : `custId=${ibcCustId}&licenseeCustId=${licenseeCustId}`;
        const nameValuePairString = custIdQueryString + `&currencyId=${currencyId}&currencyName=${currency}&userName=${userName}`;
        const queryString = (action.indexOf('?') !== -1 ? '&' : '?') + nameValuePairString;
        const urlByPlayer = action + queryString;

        return this.props.getLink(systemType, urlByPlayer);
    }

    _renderTabList(tabList) {
        const { selectedPlayer } = this.props;
        const selectedTabName = this.props.selectedTabName || this._getDefaultSelectedTab();
        const {isDeposit, isArchived} = selectedPlayer;
        const renderedTabList = !isDeposit || isArchived ? 
            tabList.filter(item => !excludedTabNameWithNonDepositAndArchived.includes(item.Name)) : tabList;

        return (
            renderedTabList.map((item) => {
                const actionUrl = this._buildActionUrl(item.SystemType, item.Action);

                return (
                    <li className="tab" key={item.Name}>
                        <a className={selectedTabName === item.Name ? "active" : ""}
                            href={actionUrl} onClick={(event) => this.handleClickMenu(event, item.Name)}>
                            {item.Text}
                        </a>
                    </li>
                )
            })
        )
    }

    _getFrameHeight() {
        const { isAdvancedSearch, isFilterCollapsing } = this.props;
        let omittedHeight;

        if (isFilterCollapsing) {
            omittedHeight = heightSlicing.whenCollapsing;
        }
        else {
            const key = isAdvancedSearch ? 'withAdvancedSearch' : 'default';
            omittedHeight = heightSlicing[key];
        }

        return window.innerHeight - omittedHeight;
    }

    _getActionUrl() {
        const { selectedTabName } = this.props;
        const tabItem = selectedTabName ? this._tabList.find(t => t.Name === selectedTabName) : this._tabList[0];

        return tabItem && this._buildActionUrl(tabItem.SystemType, tabItem.Action);
    }

    render() {
        const { selectedPlayer } = this.props;

        if (!selectedPlayer) {
            return null;
        }

        if (this._tabList.length === 0) {
            return null;
        }

        const src = this._getActionUrl();
        if (!src) {
            return null;
        }

        const frameHeight = this._getFrameHeight();

        return (
            <div className="pa-detail-container">
                <div className="page-filter-tab">
                    <div className="header-tab">
                        <div className="content-tab">
                            <ul className="tabs">
                                {this._renderTabList(this._tabList)}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-panel">
                        <div className="pa-frame-container">
                            <iframe id="paDetailFrame" style={{ height: frameHeight }} name="paDetailFrame" frameBorder="0" src={src}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const { getLink, getTabList, setSelectedTabName } = ActionCreators;
    return bindActionCreators({ getLink, getTabList, setSelectedTabName }, dispatch);
}

function mapStateToProps(state) {
    const { selectedPlayer, isAdvancedSearch, isFilterCollapsing, selectedTabName } = state;
    return Object.assign({}, { selectedPlayer, isAdvancedSearch, isFilterCollapsing, selectedTabName });
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail);