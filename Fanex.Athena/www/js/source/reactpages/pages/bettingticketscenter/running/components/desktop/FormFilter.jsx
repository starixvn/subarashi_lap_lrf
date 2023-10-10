import React from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam.jsx'
import SubsidiaryDropDown from '../filters/SubsidiaryDropDown.jsx'
import ProductFilter from '../filters/ProductFilter.jsx'
import UserNameFilter from '../filters/UserNameFilter.jsx'
import CurrecyFilter from '../filters/CurrecyFilter.jsx'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter.jsx'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter.jsx'
import StatusFilter from '../filters/StatusFilter.jsx'
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter.jsx'
import StickyButton from '../filters/StickyButton.jsx'
import { useSubsidiarySearch } from '../hooks/useSubsidiarySearch.jsx'
import useFilterAction from '../hooks/useFilterAction.jsx'

export const FormFilter = () => {
    const isValidModel = useValidParam();
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox } = useSubsidiarySearch();
    const {submit} = useFilterAction();

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={<StickyButton />}>
            <div className="row">
                {isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
                    <SubsidiaryDropDown />
                </div>}
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <ProductFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <UserNameFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <CurrecyFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <BaseCurrencyFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <ConvertAllCheckBoxFilter />
                </div>

                {!(isShowSubsidiaryDropdown && isSubsidiarySearch) && (
                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <StatusFilter />
                    </div>
                )}
            </div>
            <div className="row">

                {(isShowSubsidiaryDropdown && isSubsidiarySearch) && (
                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <StatusFilter />
                    </div>
                )}

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!isValidModel} type="button" className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>

                {isShowSubsidiarySearchCheckBox && (
                    <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                        <SubsidiaryCheckBoxFilter />
                    </div>
                )}
            </div>
        </CollapsiblePanel>
    )
}

export default FormFilter;