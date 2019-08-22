import React, { useState } from 'react';

import { tabKeys, tabList } from '../lib/constants';
import AccountProfile from './subtab/AccountProfile';
import BankInformation from './subtab/BankInformation';
import ActivityRecord from './subtab/ActivityRecord';

const componentByTab = {
    [tabKeys.accountProfile]: AccountProfile,
    [tabKeys.bankInformation]: BankInformation,
    [tabKeys.activityRecord]: ActivityRecord
}

export const TabContent = (props) => {
    const [selectedTab, setSelectedTab] = useState(tabKeys.accountProfile);

    const renderSubTab = () => {
        return tabList.map((item, index) => {
            return (
                <li className="tab" key={item.name}>
                    <a href="javascript:;" className={item.name === selectedTab ? 'active' : ''} onClick={() => setSelectedTab(item.name)}>
                        {item.text}
                    </a>
                </li>
            )
        })
    }

    const CurrentTab = componentByTab[selectedTab];

    return (
        <div className="outer-col-1">
            <div className="left-side">
                <div className="subtab">
                    <div className="header-tab">
                        <div className="content-tab">
                            <ul className="tabs">
                                {renderSubTab()}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="tab-panel">
                    <CurrentTab />
                </div>
            </div>
        </div>
    )
}

export default TabContent;