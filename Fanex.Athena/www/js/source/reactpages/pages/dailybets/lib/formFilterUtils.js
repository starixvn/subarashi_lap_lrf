import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import MultipleSelect from '@legion-lib/react-multiselect';

export const renderProductSelectList = (dataSource, onChangeHandler) => {
    return (
        <MultipleSelect id="ProductList"
            language={LangHelper.currentLanguage}
            dataSource={dataSource}
            keyField={"Code"}
            valueField={"Name"}
            statusField={"Status"}
            onChange={onChangeHandler} />
    );
}

export const renderCurrencySelectList = (dataSource, onChangeHandler) => {
    return (
        <MultipleSelect id="ddlCurrency"
            language={LangHelper.currentLanguage}
            dataSource={dataSource}
            keyField={"Key"}
            valueField={"Value"}
            statusField={"Status"}
            onChange={onChangeHandler} />);
}

export const renderSportSelectList = (dataSource, onChangeHandler) => {
    return(
        <MultipleSelect id="GameCodes" 
            language={LangHelper.currentLanguage}
            dataSource={dataSource}
            keyField={"Key"}
            valueField={"Value"}
            statusField={"Status"}
            onChange={onChangeHandler} />
    );
}