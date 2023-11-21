import React from 'react'
import {  useDispatch } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import CheckBox from '@jsroot/components/CheckBox'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import { useIsFirstRender } from 'usehooks-ts'


export const SubsidiaryCheckBoxFilter = () => {
    const dispatch = useDispatch();
    const isFirstRender = useIsFirstRender();
    const {setSubsidiaryList, setSubsidiarySearch} = ActionCreators;
    const {defaultSelectedSubsidiary, isSubsidiarySearch, isShowSubsidiarySearchCheckBox, isShowSubsidiaryDropdown} = useSubsidiarySearch();

    if (isFirstRender){
        dispatch(setSubsidiarySearch(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown))
    }
    return (
    <div className="form-group">
        <CheckBox id="SubsidiarySearch"
            checked={isSubsidiarySearch}
            onChange={checked => { dispatch(setSubsidiarySearch(checked)); checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary))}}
            label={LangHelper.getSingleResource("SubsidiarySearch")} />
    </div>)
}

export default SubsidiaryCheckBoxFilter;