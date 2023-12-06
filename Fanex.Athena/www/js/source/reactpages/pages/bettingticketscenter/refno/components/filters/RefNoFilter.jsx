import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AppData from '@jsroot/lib/AppData'
import { ActionCreators } from '../../actions/index.js'
import SearchingIdOption from '../SearchingIdOption.jsx'
import { SearchingIdOptions } from '../../lib/constants.js'
import Helper from '../../lib/helper.js'

export const RefNoFilter = () => {
    const [searchingIdOption, searchingId ] = useSelector(state => [state.searchingIdOption, state.searchingId], shallowEqual);
    const dispatch = useDispatch();
    const searchingIdText = Helper.getSearchingIdText(searchingIdOption);
    const {setSearchingId, setSearchingIdOption } = ActionCreators;

    return (
        <div className="form-group">
            <label className="label-text">
                {searchingIdText}
                {AppData.isAllowTxIDColumn && (<SearchingIdOption value={searchingIdOption} onChange={(event) => {
                    dispatch(setSearchingIdOption(event.target.value))
                    dispatch(setSearchingId(''))
                }} />)}
            </label>
            <input className="input-text" id="SearchingId" name="SearchingId"
                type={searchingIdOption === SearchingIdOptions.refNo ? "number" : "text"}
                value={searchingId}
                placeholder={searchingIdText}
                onChange={(event) => dispatch(setSearchingId(event.target.value))} />
        </div>)
}
export default memo(RefNoFilter);