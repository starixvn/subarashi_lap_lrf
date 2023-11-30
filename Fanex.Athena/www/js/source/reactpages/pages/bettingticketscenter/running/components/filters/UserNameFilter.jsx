import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AutoComplete from '@jsroot/components/auto-complete'
import { ApiUrl } from '../../../common/lib/constants'

const UserNameFilter = () => {
    const dispatch = useDispatch();
    const {setUsername} = ActionCreators;

    return (
        <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Username")}</label>
        <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
            onSelect={(value) => dispatch(setUsername(value))}
            onInput={(value) => dispatch(setUsername(value))}
            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
    </div>
    )
}

export default memo(UserNameFilter);