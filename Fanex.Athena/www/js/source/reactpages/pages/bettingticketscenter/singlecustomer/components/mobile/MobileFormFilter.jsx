import React, { useState } from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam'
import DateRangeFilter from '../filters/DateRangeFilter'
import ProductFilter from '../filters/ProductFilter'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter'
import UserNameFilter from '../filters/UserNameFilter'
import StatusFilter from '../filters/StatusFilter'
import PlatformFilter from '../filters/PlatformFilter'
import LiveStatusFilter from '../filters/LiveStatusFilter'
import StickyButton from '../filters/StickyButton'
import useFilterAction from '../hooks/useFilterAction'

export const MobileFormFilter = () => {
    const isValidModel = useValidParam();
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
                <div className="col-12 col-xs-6">
                    <DateRangeFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <UserNameFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <StatusFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <ProductFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <BaseCurrencyFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <ConvertAllCheckBoxFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <PlatformFilter />
                </div>
                <div className="col-12 col-xs-6" style={style} >
                    <LiveStatusFilter />
                </div>
                
                <div className="col-12">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                    <div className='caret-block'>
                        <StickyButton/>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    )
}

export default MobileFormFilter;