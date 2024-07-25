import React, { useEffect, memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import { ALL_SELECTED_TEXT } from './../../../common/lib/constants'

export const LeagueFilter = () => {
    const dispatch = useDispatch();
    const [selectedLeague, selectedSport, leagueList ] = useSelector(state => [state.selectedLeague, state.selectedSport, state.leagueList], shallowEqual);
    const {setSelectedLeague, getMatchList, setMatchList } = ActionCreators;
    
    useEffect(() => {
        getMatchByLeague(selectedSport, selectedLeague);
      }, [selectedSport]);

    
    const _leagueChangeHandler = (currentItem, selectedItemsKey) => {
        dispatch(setSelectedLeague(selectedItemsKey));
        getMatchByLeague(selectedSport, selectedItemsKey);
    }

    const getMatchByLeague = (selectedSport, selectedLeague) => {
        const isSingleLeague = !leagueList || leagueList.length > 0 && !!selectedLeague && selectedLeague.split(",").length === 1;

        if (isSingleLeague) {  
            dispatch(getMatchList(selectedSport, selectedLeague));        
        }
        else {
            dispatch(setMatchList([]))
        }
    }
    
    const _renderLeagueSelectList = () => {
        if(!leagueList || !leagueList.length){
            var dataSource = [{ Id: 0, Value: LangHelper.getSingleResource('All'), Status: true }];
            return(
                <MultipleSelect id="StatusListAll"
                language={LangHelper.currentLanguage}
                dataSource={dataSource}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={_leagueChangeHandler}
                disabled={true} 
                allOptionValue={ALL_SELECTED_TEXT}/>
            )
        }

        return  (
                <MultipleSelect id="LeagueList"
                language={LangHelper.currentLanguage}
                dataSource={leagueList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={_leagueChangeHandler} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("League")}</label>
        {_renderLeagueSelectList()}
    </div>)
}

export default memo(LeagueFilter);