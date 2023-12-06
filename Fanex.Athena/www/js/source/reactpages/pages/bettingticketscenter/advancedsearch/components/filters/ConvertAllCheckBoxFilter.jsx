import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import PropTypes from 'prop-types';

export const ConvertAllCheckBoxFilter = (props) => {
    const{value, onChange} = props

    return (
    <div className="form-group">
        <CheckBox id="IsConvertAll"
            checked={value}
            onChange={onChange}
            label={LangHelper.getSingleResource("ConvertAllFiguresToBaseCurrency")} />
    </div>)
}

const propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func
};

ConvertAllCheckBoxFilter.propTypes = propTypes

export default memo(ConvertAllCheckBoxFilter);