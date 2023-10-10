import React from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import BaseCurrencySelectList from '../filters/BaseCurrencySelectList'
import useFilterAction from '../hooks/useFilterAction'
import { useValidParam } from '../hooks/useValidParam'
import StickyButton from '../filters/StickyButton'
import RefNoFilter from '../filters/RefNoFilter'
import UserNameFilter from '../filters/UserNameFilter'
import ConvertAllCheckBox from '../filters/ConvertAllCheckBox'
import Note from '../filters/Note'
import { useState } from 'react'

export const MobileFormFilter = () => {
    const isValidModel = useValidParam();
    const { submit } = useFilterAction();
    const [isCollapsed, setIsCollapse] = useState(true);

    const onCollapse = () => {
        setIsCollapse(true);
    }
    const onExpand = () => {
        setIsCollapse(false);
    }

    const style = isCollapsed ? {display: "none"} : {};

    return (
        <CollapsiblePanel className="mobile-mode page-filter"
            onCollapse={onCollapse}
            onExpand={onExpand}
            isInitCollapsed={true}
            isCustomCollapse={true}>

            <div className="row">
                <div className="col-12 col-xs-6">
                    <RefNoFilter />
                </div>
                <div className="col-12 col-xs-6">
                    <UserNameFilter />
                </div>
                <div className="col-12 col-xs-6" style={style}>
                    <BaseCurrencySelectList />
                </div>
                <div className="col-12 col-xs-6" style={style}>
                    <ConvertAllCheckBox />
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
            <div className="row filter-note" style={style}>
                <Note contentClass="col-12" />
            </div>
        </CollapsiblePanel>
    )
}

export default MobileFormFilter;