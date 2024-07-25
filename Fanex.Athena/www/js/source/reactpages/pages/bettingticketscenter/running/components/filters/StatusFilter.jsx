import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'

export const StatusFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedStatus} = ActionCreators;

    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return statusList && statusList.length && (
            <MultipleSelect id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey))}/>
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
        {_renderStatusSelectList()}
    </div>)
}

export default memo(StatusFilter);