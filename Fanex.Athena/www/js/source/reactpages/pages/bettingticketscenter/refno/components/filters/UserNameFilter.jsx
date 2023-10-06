import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AutoComplete from '@jsroot/components/auto-complete'
import LangHelper from '@jsroot/lib/langHelper'
import { ActionCreators } from '../../actions/index.js'
import { ApiUrl } from '../../../common/lib/constants'
import Helper from '../../lib/helper'

export const UserNameFilter = () => {
    const searchingIdOption  = useSelector(state => state.searchingIdOption, shallowEqual);
    const dispatch = useDispatch();
    const userNameText = Helper.getUserNameText(searchingIdOption);

    const {setUsername } = ActionCreators;

    return (
        <div className="form-group">
        <label className="label-text">{userNameText}</label>
        <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
            onSelect={(value) => dispatch(setUsername(value))}
            onInput={(value) => dispatch(setUsername(value))}
            htmlAttributes={{ placeholder: LangHelper.getSingleResource("ExternalIdOrSystemId") }} />
    </div>)
}
export default UserNameFilter;