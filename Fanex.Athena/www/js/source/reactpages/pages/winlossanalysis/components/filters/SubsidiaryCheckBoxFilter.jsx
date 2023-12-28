import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const SubsidiaryCheckBoxFilter = (props) => {
    const {value, onChange} = props

    return (
    <div className="form-group">
        <CheckBox id="SubsidiarySearch"
            checked={value}
            onChange={onChange}
            label={LangHelper.getSingleResource("SubsidiarySearch")} />
    </div>)
}

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool
};

SubsidiaryCheckBoxFilter.propTypes = propTypes;


export default memo(SubsidiaryCheckBoxFilter);