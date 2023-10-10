import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import useBaseCurrencyList from '@jsroot/customHooks/useBaseCurrencyList'
import Select from 'react-select'


export const BaseCurrencyFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedBaseCurrency} = ActionCreators;
    const baseCurrencyList = useBaseCurrencyList();
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);

    const _renderBaseCurrencySelectList = () => {
        return baseCurrencyList && baseCurrencyList.length && (
            <Select instanceId="ddlBased"
                value={selectedBaseCurrency}
                options={baseCurrencyList}
                onChange={(item) => dispatch(setSelectedBaseCurrency(item.value))} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
        {_renderBaseCurrencySelectList()}
    </div>)
}

export default BaseCurrencyFilter;