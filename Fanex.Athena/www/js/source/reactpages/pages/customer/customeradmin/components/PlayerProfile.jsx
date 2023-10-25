import React, { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { TabMenu } from '../components/tabMenu';
import { tabMenuList, preLoadComponents } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

export const PlayerProfile = (props) => {

    const [userProfile, setUserProfile] = useState({
        username: 'Test',
        currency: 'Test',
        dateOfRegistration: 'Test',
        country: 'Test',
        iP: 'Test'
    });

    if (!props.isSubmitted) {
        return null;
    }

    useEffect(() => {

    }, [props.username])

    const _onClickTabMenu = tabKey => {
        const { setSelectedTab } = props;
        setSelectedTab && setSelectedTab(tabKey);
    }

    preLoadComponents(tabMenuList);

    const { selectedTabKey } = props;
    const selectedTab = tabMenuList.find(_ => _.key === selectedTabKey);
    const Component = selectedTab.component;

    return (
        <>
        <div className="page-filter">
            <div className="player-profile">
                <ul className="columns">
                    <li>{LangHelper.getSingleResource("Username")}: <span className='user-info'>{userProfile.username}</span></li>
                    <li>{LangHelper.getSingleResource("Currency")}:  <span className='user-info'>{userProfile.currency}</span></li>
                    <li>{LangHelper.getSingleResource("DateOfRegistration")}:  <span className='user-info'>{userProfile.dateOfRegistration}</span></li>
                </ul>
                <ul className="columns">
                    <li>{LangHelper.getSingleResource("Country")}:  <span className='user-info'>{userProfile.country}</span></li>
                    <li>{LangHelper.getSingleResource("IP")}:  <span className='user-info'>{userProfile.iP}</span></li>
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
    const { isSubmitted, username, selectedTabKey, param } = state;
    return Object.assign({}, { isSubmitted, username, selectedTabKey, param });
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);
