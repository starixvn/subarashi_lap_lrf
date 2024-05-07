import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import UserGuide from '@jsroot/components/UserGuide'
import useFilterAction from '../hooks/useFilterAction.jsx'

const StickyIcon = () => {
    const {exportExcel} = useFilterAction();
    const userGuideContent = useSelector(state => state.userGuideContent);
    const dispatch = useDispatch();
    const {getUserGuideContent} = ActionCreators;
    
    const _showUserGuide = () => {
        if (!userGuideContent || userGuideContent.length === 0) {
            dispatch(getUserGuideContent('BettingTicketCenterBookedBet'));
        }
    }

    const _renderUserGuide = () => {
        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={LangHelper.getSingleResource("BettingTicketCenter")}
            onClick={_showUserGuide}
            content={userGuideContent} />)
    }
    
    return (
        <div>
            <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
            {_renderUserGuide()}
        </div>)
}

export default memo(StickyIcon);