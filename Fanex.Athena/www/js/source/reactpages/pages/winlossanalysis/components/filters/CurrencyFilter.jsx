import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const CurrencyFilter = (props) => {
    const {onChange, isValid} = props;

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length && (
            <MultipleSelect
                id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange}
                isValid={isValid} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
        {_renderCurrencySelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func,
    isValid: PropTypes.bool
};

CurrencyFilter.propTypes = propTypes;

export default memo(CurrencyFilter);