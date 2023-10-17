import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import Select from 'react-select'


export const BaseCurrencyFilter = () => {
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);
    const dispatch = useDispatch();
    const {setSelectedBaseCurrency} = ActionCreators;
    const { baseCurrencyList,  selectedBaseCurrency: newBaseCurrency  } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);

    useEffect(() => {
        dispatch(setSelectedBaseCurrency(newBaseCurrency))
    }, [newBaseCurrency])

    const _renderBaseCurrencySelectList = () => {
        return baseCurrencyList?.length && (
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