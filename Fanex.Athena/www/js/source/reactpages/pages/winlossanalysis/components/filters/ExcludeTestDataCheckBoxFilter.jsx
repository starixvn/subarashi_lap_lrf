import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import PropTypes from 'prop-types';

export const ExcludeTestDataCheckBoxFilter = (props) => {
    return (
        <div className="form-group">
            <CheckBox id="IsExcludeTestData"
                {...props}
                label={LangHelper.getSingleResource("ExcludeTestData")} />
        </div>
    )
}

const propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
};

ExcludeTestDataCheckBoxFilter.propTypes = propTypes;


export default memo(ExcludeTestDataCheckBoxFilter);