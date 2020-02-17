import React from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import AppLayout from '@jsroot/layouts/AppLayout';
import { TabMenu } from '../components/tabMenu';
import { tabMenuList } from '../lib/constants';

export class AppContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    _renderSelectedTab = () => {
        const selectedTab = tabMenuList.find(_ => _.key === selectedTabKey);
        const Component = selectedTab.Component;
        return Component;
    };

    _onClickTabMenu = tabKey => {
        const { setSelectedTab } = this.props;
        setSelectedTab && setSelectedTab(tabKey);
    }

    render() {
        const { selectedTabKey } = this.props;
        const selectedTab = tabMenuList.find(_ => _.key === selectedTabKey);
        const Component = selectedTab.component;
        return (
            <AppLayout>
                <div id="player-segmentation">
                    <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={this._onClickTabMenu} tabMenuList={tabMenuList} />
                    {Component && <Component/>}
                </div>
            </AppLayout>);
    }
}

function mapStateToProps(state) {
    const { selectedTabKey } = state;
    return Object.assign({}, { selectedTabKey });
}

function mapDispatchToProps(dispatch) {
    const {  setSelectedTab } = ActionCreators;
    return bindActionCreators({ setSelectedTab }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);