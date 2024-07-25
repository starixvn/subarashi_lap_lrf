import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'

export const MatchFilter = () => {
    const dispatch = useDispatch();
    const [selectedMatch, matchList ] = useSelector(state => [state.selectedMatch, state.matchList], shallowEqual);
    const {setSelectedMatch} = ActionCreators;

    const _renderMatchSelectList = () => {
        if(!matchList || !matchList.length){
            var dataSource = [{ value: 0, label: LangHelper.getSingleResource('All') }];
            return(
                <Select 
                disabled={true} 
                value={0} 
                options={dataSource}
                instanceId="MatchListAll" />
            )
        }

        return (
            <Select 
                value={selectedMatch} 
                options={matchList} 
                onChange={(item) => dispatch(setSelectedMatch(item.value))} 
                instanceId="MatchList" />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Match")}</label>
        {_renderMatchSelectList()}
    </div>)
}

export default memo(MatchFilter);