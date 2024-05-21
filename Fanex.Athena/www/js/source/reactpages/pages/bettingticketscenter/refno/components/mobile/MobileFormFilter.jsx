import React, { memo, useState } from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import BaseCurrencySelectList from '../filters/BaseCurrencySelectList'
import useFilterAction from '../hooks/useFilterAction'
import { useValidParam } from '../hooks/useValidParam'
import { useSelector } from 'react-redux'
import StickyIcon from '../filters/StickyIcon'
import RefNoFilter from '../filters/RefNoFilter'
import UserNameFilter from '../filters/UserNameFilter'
import ConvertAllCheckBox from '../filters/ConvertAllCheckBox'
import ViewSabaCoinsCheckBox from '../filters/ViewSabaCoinsCheckBox'
import AppData from '@jsroot/lib/AppData'
import Note from '../filters/Note'

export const MobileFormFilter = () => {
    const isValidModel = useValidParam();
    const { submit } = useFilterAction();
    const [isCollapsed, setIsCollapse] = useState(true);
    const viewSabaCoins = useSelector(state => state.viewSabaCoins);

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
                    <BaseCurrencySelectList disabled={viewSabaCoins}/>
                </div>
                <div className="col-12 col-xs-6" style={style}>
                    <ConvertAllCheckBox disabled={viewSabaCoins}/>
                </div>
                {AppData.isAllowSabaCoins && <div className="col-12 col-xs-6" style={style}>
                    <ViewSabaCoinsCheckBox />
                </div>}
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
            <div className="row filter-note" style={style}>
                <Note contentClass="col-12" />
            </div>
        </CollapsiblePanel>
    )
}

export default memo(MobileFormFilter);