import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const GroupInOriginalCurrencyCheckBoxFilter = (props) => {
    return (
    <div className="form-group">
        <CheckBox id="IsGroupInOriginalCurrency"
            {...props}
            label={LangHelper.getSingleResource("IsGroupInOriginalCurrency")} />
    </div>)
}

const propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
};

GroupInOriginalCurrencyCheckBoxFilter.propTypes = propTypes;


export default  memo(GroupInOriginalCurrencyCheckBoxFilter);