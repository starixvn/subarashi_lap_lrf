import React from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import MainFilter from '../filter/MainFilter.jsx';
import GroupByFilter from '../filter/GroupByFilter.jsx';


export const MobileFormFilter = () => {

        return (
            <CollapsiblePanel className="aggregate-filter">
                <MainFilter/>
                <GroupByFilter/>
            </CollapsiblePanel>
        )
    
}

export default MobileFormFilter;