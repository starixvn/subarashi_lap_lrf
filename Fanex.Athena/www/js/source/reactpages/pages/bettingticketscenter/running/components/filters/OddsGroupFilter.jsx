import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'

export const OddsGroupFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedOddsGroup} = ActionCreators;
    
    const _renderOddsGroupsSelectList = () => {
        const oddsGroups = AppData.oddsGroups;

        return oddsGroups?.length && (
            <MultipleSelect key="oddsGroup"
                id="OddsGroup"
                language={LangHelper.currentLanguage}
                dataSource={oddsGroups}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey))}
                />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
        {_renderOddsGroupsSelectList()}
    </div>)
}

export default memo(OddsGroupFilter);