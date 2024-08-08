import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const LiveStatusFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedLiveStatus} = ActionCreators;

    const _renderLiveStatusSelectList = () => {
        const liveStatusList = AppData.liveStatusList;

        return liveStatusList?.length && (
            <MultipleSelect id="LiveStatusList"
                language={LangHelper.currentLanguage}
                dataSource={liveStatusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey))}/>
        );
    }


    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Live")}</label>
        {_renderLiveStatusSelectList()}
    </div>)
}

export default memo(LiveStatusFilter);