import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { TabMenu } from '../components/tabMenu';
import { tabMenuList } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

export const PlayerProfile = (props) => {
    const {fromDate, toDate} = props.dateRange;

    if (!props.isSubmitted) {
        return null;
    }

    const _onClickTabMenu = tabKey => {
        const { setSelectedTab } = props;
        setSelectedTab && setSelectedTab(tabKey);
    }

    const _handleChangeHistoryOption = (event) => {
        const { value } = event.target;
        props.setHistoryOption(value);
    }

    const { selectedTabKey } = props;
    const selectedTab = tabMenuList.find(_ => _.key === selectedTabKey);
    const Component = selectedTab.component;

    const reportTitle = `${LangHelper.getSingleResource('CustomerAdministrationIvoryReportTitle')}:  ${fromDate} -> ${toDate}`;
    return (
        <>
        <div className="page-filter"> 
            <div className="player-profile">
                <b>{reportTitle}</b>
            </div>
            <div id="customer-admin">
                <TabMenu 
                    selectedTabMenu={props.selectedTabKey} 
                    onClickTabMenu={_onClickTabMenu}
                    tabMenuList={tabMenuList}
                    historyOption={props.historyOption}
                    handleChangeHistoryOption={_handleChangeHistoryOption}/>
            </div>
        </div>
        {Component && <Suspense fallback={<div>Loading...</div>}>
                            <Component selectedTabKey={props.selectedTabKey} />
        </Suspense>}
        </>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedTab, setHistoryOption } = ActionCreators;
    return bindActionCreators({ setSelectedTab, setHistoryOption }, dispatch);
}
function mapStateToProps(state) {
    const { isSubmitted, username, selectedTabKey, param , userInfo, dateRange, historyOption} = state;
    return Object.assign({}, { isSubmitted, username, selectedTabKey, param, userInfo, dateRange, historyOption });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);
