import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import LangHelper from '@jsroot/lib/langHelper'
import { ActionCreators } from '../../actions/index.js'
import Helper from '../../lib/helper'
import SearchingIdOption from '../SearchingIdOption'
import {SearchingIdOptions } from '../../lib/constants'
import AutoComplete from '@jsroot/components/auto-complete'
import { ApiUrl } from '../../../common/lib/constants'

export const UserInputFilter = () => {
    const [searchingIdOption, searchingId ] = useSelector(state => [state.searchingIdOption, state.searchingId], shallowEqual);
    const dispatch = useDispatch();
    const searchingIdText = Helper.getSearchingIdText(searchingIdOption);
    const {setSearchingId, setSearchingIdOption } = ActionCreators;

    return (
        <div className="form-group">
            <label className="label-text">
                {`${LangHelper.getSingleResource("BookedId")}/ ${LangHelper.getSingleResource("RefNo")}/ ${LangHelper.getSingleResource("Username")}*`}
                {<SearchingIdOption value={searchingIdOption} onChange={(event) => {
                    dispatch(setSearchingIdOption(event.target.value))
                    dispatch(setSearchingId(''))
                }} />}
            </label>
            {searchingIdOption === SearchingIdOptions.userName ? 
                <AutoComplete url={ApiUrl.CUSTOMER_SEARCH_URL}
                    onSelect={(value) => dispatch(setSearchingId(value))}
                    onInput={(value) => dispatch(setSearchingId(value))}
                    htmlAttributes={{ placeholder: searchingIdText }} />
                :
                <input className="input-text" id="SearchingId" name="SearchingId"
                    type="number"
                    value={searchingId}
                    placeholder={searchingIdText}
                    onChange={(event) => dispatch(setSearchingId(event.target.value))} />
            }
        </div>)
}
export default memo(UserInputFilter);