import React from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const CurrecyFilter = () => {
    const dispatch = useDispatch();
    const {setSelectedCurrency} = ActionCreators;

    const  _onChangeCurrency = (currencyIdList) => {
        dispatch(setSelectedCurrency(currencyIdList));
    }

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={(currentItem, selectedItemsKey) => _onChangeCurrency(selectedItemsKey)} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
        {_renderCurrencySelectList()}
    </div>)
}

export default CurrecyFilter;