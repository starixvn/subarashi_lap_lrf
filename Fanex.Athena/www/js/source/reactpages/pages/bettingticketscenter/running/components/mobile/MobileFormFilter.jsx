import React, { useState } from 'react'
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
import StickyIcon from '../filters/StickyIcon.jsx'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import useFilterAction from '../hooks/useFilterAction.jsx'

export const MobileFormFilter = () => {
    const isValidModel = useValidParam();
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox } = useSubsidiarySearch();
    const { submit } = useFilterAction();
    const [isCollapsed, setIsCollapse] = useState(true)

    const onCollapse = () => {
        setIsCollapse(true);
    }
    const onExpand = () => {
        setIsCollapse(false);
    }

    const style = isCollapsed ? { display: "none" } : {};

    return (
        <CollapsiblePanel className="mobile-mode page-filter"
            onCollapse={onCollapse}
            onExpand={onExpand}
            isInitCollapsed={true}
            isCustomCollapse={true}>
            <div className="row">

                {isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-xs-6" style={style} >
                    <SubsidiaryDropDown />
                </div>}
                <div className="col-12 col-xs-6">
                    <ProductFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <UserNameFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <CurrecyFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <StatusFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <BaseCurrencyFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <ConvertAllCheckBoxFilter />
                </div>
                {isShowSubsidiarySearchCheckBox && (
                    <div className="col-12 col-xs-6" style={style}>
                        <SubsidiaryCheckBoxFilter />
                    </div>
                )}
                
                <div className="col-12">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                    <div className='caret-block'>
                        <StickyIcon/>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    )
}

export default MobileFormFilter;