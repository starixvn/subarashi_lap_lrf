import React from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import PropTypes from 'prop-types';
import { memo } from 'react';

export const ViewCashOutOnlyFilter = (props) => {
    return (
        <div className="form-group">
            <CheckBox id="IsViewCashOutOnly"
                {...props}
                label={LangHelper.getSingleResource("ViewCashOutOnly")} />
        </div>
    )
}

const propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
};

ViewCashOutOnlyFilter.propTypes = propTypes;


export default memo(ViewCashOutOnlyFilter);