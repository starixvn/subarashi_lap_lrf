
import React, { memo } from 'react'
import AppData from '@jsroot/lib/AppData'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'


export const BaseCurrencySelectList = (props) => {
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);
    const dispatch = useDispatch();
    const {setSelectedBaseCurrency} = ActionCreators;
    let baseCurrencyList = [];
    
    if (props.disabled) 
    {
        baseCurrencyList = [{ value: "All", label: LangHelper.getSingleResource("All")}];
    }
    else 
    {
        baseCurrencyList = [...AppData.baseCurrencyList];
    }

    return( 
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
        {baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="ddlBased"
                key={`ddlBased_${props.disabled}`}
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => dispatch(setSelectedBaseCurrency(item.value))} 
                {...props}/>
        )}
    </div>)
}
export default memo(BaseCurrencySelectList);
