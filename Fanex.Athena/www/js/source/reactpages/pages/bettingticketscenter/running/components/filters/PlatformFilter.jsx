import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const ProductFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedPlatform} = ActionCreators;
    const selectedPlatform = useSelector(state => state.selectedPlatform);

    const _renderPlatformSelectList = () => {
        const platformList = AppData.platformList;

        return platformList?.length && (
            <MultipleSelect id="PlatformList"
                language={LangHelper.currentLanguage}
                value={selectedPlatform}
                dataSource={platformList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey))} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Platform")}</label>
        {_renderPlatformSelectList()}
    </div>)
}

export default memo(ProductFilter);