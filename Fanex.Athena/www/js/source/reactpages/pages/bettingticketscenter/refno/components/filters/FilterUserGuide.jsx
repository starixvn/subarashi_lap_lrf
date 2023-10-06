
import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import UserGuide from '@jsroot/components/UserGuide'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import { useEffect } from 'react'


export const FilterUserGuide = () => {
    const userGuideContent = useSelector(state => state.userGuideContent);
    useEffect(() => {
    }, [userGuideContent]);
    const dispatch = useDispatch();
    const {getUserGuideContent} = ActionCreators;
    const _showUserGuide = () => {
        if (!userGuideContent || userGuideContent.length === 0) {
            dispatch(getUserGuideContent('BettingTicketCenterRefno'));
        }
    }  
  
        return (<UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={LangHelper.getSingleResource("BettingTicketCenter")}
            onClick={_showUserGuide}
            content={userGuideContent} />)
    
}
export default FilterUserGuide
