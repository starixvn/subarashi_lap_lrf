
import React, { memo } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import FilterUserGuide from './FilterUserGuide.jsx'
import useFilterAction from '../hooks/useFilterAction.jsx'

export const StickyIcon = () => {
    const { exportExcel} = useFilterAction(); 
        return (        
        <div>
            <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
            <FilterUserGuide/>
        </div>)
    
}
export default memo(StickyIcon);
