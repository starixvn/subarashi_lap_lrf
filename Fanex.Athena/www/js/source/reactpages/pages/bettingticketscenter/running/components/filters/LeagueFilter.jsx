import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'

export const LeagueFilter = () => {
    const dispatch = useDispatch();
    const [selectedSport, leagueList, isEnableLeague ] = useSelector(state => [state.selectedSport, state.leagueList, state.isEnableLeague], shallowEqual);
    const {setSelectedLeague, getMatchList, setEnableMatch } = ActionCreators;
    
    const _leagueChangeHandler = (currentItem, selectedItemsKey) => {
        dispatch(setSelectedLeague(selectedItemsKey));
        const isSingleLeague = !!selectedItemsKey && selectedItemsKey.split(",").length === 1;
        const isEnableMatch = isEnableLeague && isSingleLeague;
        
        dispatch(setEnableMatch(isEnableMatch));
        if (isEnableMatch) {  
            dispatch(getMatchList(selectedSport, selectedItemsKey));        
        }
    }
    
    const _renderLeagueSelectList = () => {
        if(!leagueList || !leagueList.length || !isEnableLeague){
            var dataSource = [{ Id: 0, Value: LangHelper.getSingleResource('All'), Status: true }];
            return(
                <MultipleSelect id="StatusListAll"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={_leagueChangeHandler}
                disabled={true} />
            )
        }

        return  (
                <MultipleSelect id="LeagueList"
                language={LangHelper.currentLanguage}
                dataSource={leagueList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={_leagueChangeHandler} 
                disabled={!isEnableLeague}/>
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("League")}</label>
        {_renderLeagueSelectList()}
    </div>)
}

export default memo(LeagueFilter);