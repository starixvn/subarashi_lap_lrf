import React, { memo, useState } from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam'
import DateRangeFilter from '../filters/DateRangeFilter'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter'
import StatusFilter from '../filters/StatusFilter'
import UserInputFilter from '../filters/UserInputFilter'
import PlatformFilter from '../filters/PlatformFilter'
import StickyIcon from '../filters/StickyIcon'
import useFilterAction from '../hooks/useFilterAction'
import SubsidiaryDropDown from '../filters/SubsidiaryDropDown.jsx'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter.jsx'
import CurrecyFilter from '../filters/CurrecyFilter.jsx'

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
                    <DateRangeFilter isMobile={true}/>
                </div>
                <div className="col-12 col-xs-6">
                    <UserInputFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <StatusFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <PlatformFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <CurrecyFilter />
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

export default memo(MobileFormFilter);