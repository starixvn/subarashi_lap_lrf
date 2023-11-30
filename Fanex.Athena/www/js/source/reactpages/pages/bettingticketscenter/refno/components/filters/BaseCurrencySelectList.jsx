
import React, { memo } from 'react'
import AppData from '@jsroot/lib/AppData'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'


export const BaseCurrencySelectList = () => {
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);
    const dispatch = useDispatch();
    const {setSelectedBaseCurrency} = ActionCreators;
    const baseCurrencyList = AppData.baseCurrencyList;
    return( 
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
        {baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="ddlBased"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => dispatch(setSelectedBaseCurrency(item.value))} />
        )}
    </div>)
}
export default memo(BaseCurrencySelectList);
