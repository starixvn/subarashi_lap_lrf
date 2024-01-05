import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import Select from 'react-select'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const BaseCurrencyFilter = (props) => {
    const {onChange, value , options} = props;
    const _renderBaseCurrencySelectList = () => {
        const baseCurrencyList = options;
        return baseCurrencyList?.length && (
            <Select instanceId="ddlBased"
                value={value}
                options={options}
                onChange={onChange} />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("BaseCurrency")}</label>
        {_renderBaseCurrencySelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
};

BaseCurrencyFilter.propTypes = propTypes;

export default memo(BaseCurrencyFilter);