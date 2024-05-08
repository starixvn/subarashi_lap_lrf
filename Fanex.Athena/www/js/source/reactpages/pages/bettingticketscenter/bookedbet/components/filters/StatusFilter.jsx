import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const StatusFilter = (props) => {
    const dispatch = useDispatch();
    const {setSelectedStatus} = ActionCreators;

    props.disabled && dispatch(setSelectedStatus(AppData.defaultSelectedStatus));

    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return statusList?.length && (
            <MultipleSelect
                key={`StatusList_${props.disabled}`}
                id="StatusList"
                language={LangHelper.currentLanguage}
                dataSource={statusList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey))} 
                {...props}/>);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Status")}</label>
        {_renderStatusSelectList()}
    </div>)
}

export default memo(StatusFilter);