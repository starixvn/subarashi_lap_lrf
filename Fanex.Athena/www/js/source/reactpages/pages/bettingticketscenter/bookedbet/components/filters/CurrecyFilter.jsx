import React, { memo } from 'react'
import {  useDispatch } from 'react-redux'
import MultipleSelect from '@legion-lib/react-multiselect'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'


export const CurrecyFilter = (props) => {
    const dispatch = useDispatch();
    const {setSelectedCurrency} = ActionCreators;

    props.disabled && dispatch(setSelectedCurrency(AppData.defaultSelectedCurrency));

    const  _onChangeCurrency = (currencyIdList) => {
        dispatch(setSelectedCurrency(currencyIdList));
    }

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect 
                key={`ddlCurrency_${props.disabled}`}
                id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => _onChangeCurrency(selectedItemsKey)} 
                {...props}/>);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
        {_renderCurrencySelectList()}
    </div>)
}

export default memo(CurrecyFilter);