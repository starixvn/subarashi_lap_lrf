
import React from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import ActionCreators from './actions';
import Loader from '@jsroot/components/Loader';
import AppLayout from '@jsroot/layouts/AppLayout';
import { TabMenu } from './components/tabMenu';
import { tabMenuList } from './lib/constants';

export const AppContainer = props => {
    const { selectedTab } = props;

    const _getCurrentTab = () => {};

    const _onClickTabMenu = tabKey => {
        const { setSelectedTab } = props;
        setSelectedTab && setSelectedTab(tabKey);
    }
    
    return (
        <AppLayout>
            <Loader isLoading={false} />
            <TabMenu selectedTabMenu={selectedTab} onClickTabMenu={_onClickTabMenu} tabMenuList={tabMenuList} />
        </AppLayout>
    )
}

function mapStateToProps(state) {
    const { selectedTab } = state;
    return Object.assign({}, { selectedTab });
}

function mapDispatchToProps(dispatch) {
    const {  setSelectedTab } = ActionCreators;
    return bindActionCreators({ setSelectedTab }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);