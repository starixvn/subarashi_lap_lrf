import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { TabMenu } from '../components/tabMenu';
import { tabMenuList } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

export const PlayerProfile = (props) => {

    const { userName, currencyCode, ip, country, registeredDateString } = props.userInfo;

    if (!props.isSubmitted) {
        return null;
    }

    const _onClickTabMenu = tabKey => {
        const { setSelectedTab } = props;
        setSelectedTab && setSelectedTab(tabKey);
    }

    const { selectedTabKey } = props;
    const selectedTab = tabMenuList.find(_ => _.key === selectedTabKey);
    const Component = selectedTab.component;
    return (
        <>
        <div className="page-filter">
            <div className="player-profile">
                <ul className="columns">
                    <li>{LangHelper.getSingleResource("Username")}: <span className='user-info'>{userName}</span></li>
                    <li>{LangHelper.getSingleResource("Currency")}:  <span className='user-info'>{currencyCode}</span></li>
                    <li>{LangHelper.getSingleResource("DateOfRegistration")}:  <span className='user-info'>{registeredDateString}</span></li>
                </ul>
                <ul className="columns">
                    <li>{LangHelper.getSingleResource("Country")}:  <span className='user-info'>{country}</span></li>
                    <li>{LangHelper.getSingleResource("IP")}:  <span className='user-info'>{ip}</span></li>
                </ul>
            </div>   
            <div id="customer-admin">
                <TabMenu selectedTabMenu={props.selectedTabKey} onClickTabMenu={_onClickTabMenu} tabMenuList={tabMenuList} />
            </div>
        </div>
        {Component && <Suspense fallback={<div>Loading...</div>}>
                            <Component selectedTabKey={props.selectedTabKey} />
        </Suspense>}
        </>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedTab } = ActionCreators;
    return bindActionCreators({ setSelectedTab }, dispatch);
}
function mapStateToProps(state) {
    const { isSubmitted, username, selectedTabKey, param , userInfo} = state;
    return Object.assign({}, { isSubmitted, username, selectedTabKey, param, userInfo });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);
