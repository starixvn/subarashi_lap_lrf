import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import AutoComplete from '@jsroot/components/auto-complete'
import { ApiUrl } from '../../../common/lib/constants'
import PropTypes from 'prop-types';

const UserNameFilter = (props) => {
    const {onChange} = props
    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
        <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
            onSelect={onChange}
            onInput={onChange}
            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
    </div>
    )
}

const propTypes = {
    onChange: PropTypes.func
};

UserNameFilter.propTypes = propTypes;

export default memo(UserNameFilter);