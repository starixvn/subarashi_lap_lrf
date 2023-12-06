import React from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import MainFilter from './MainFilter.jsx';
import GroupByFilter from './GroupByFilter.jsx';
import { memo } from 'react';


export const FormFilter = () => {
    return (
        <CollapsiblePanel className="aggregate-filter">
            <MainFilter />
            <GroupByFilter />
        </CollapsiblePanel>
    )
}

export default memo(FormFilter);