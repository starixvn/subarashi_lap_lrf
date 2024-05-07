import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const ProductFilter = (props) => {
    const dispatch = useDispatch();
    const {setSelectedPlatform} = ActionCreators;
    const selectedPlatform = useSelector(state => state.selectedPlatform);

    props.disabled && dispatch(setSelectedPlatform(AppData.defaultSelectedPlatform));

    const _renderPlatformSelectList = () => {
        const platformList = AppData.platformList;

        return platformList?.length && (
            <MultipleSelect 
                key={`PlatformList_${props.disabled}`}
                id="PlatformList"
                language={LangHelper.currentLanguage}
                value={selectedPlatform}
                dataSource={platformList}
                valueField={"label"}
                keyField={"value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey))} 
                {...props}/>
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Platform")}</label>
        {_renderPlatformSelectList()}
    </div>)
}

export default memo(ProductFilter);