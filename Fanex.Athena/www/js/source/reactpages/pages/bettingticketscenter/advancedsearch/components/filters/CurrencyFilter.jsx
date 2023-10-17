import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import PropTypes from 'prop-types';

export const CurrencyFilter = (props) => {
    const {onChange} = props;


    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList?.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"Id"}
                valueField={"Value"}
                statusField={"Status"}
                onChange={onChange} />);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
        {_renderCurrencySelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func
};

CurrencyFilter.propTypes = propTypes;

export default CurrencyFilter;