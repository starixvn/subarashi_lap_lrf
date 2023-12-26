import React from 'react';
import TabMenuItem from './TabMenuItem';

export const TabMenu = (props) => {
    const { selectedTabMenu, onClickTabMenu, tabMenuList, historyOption, handleChangeHistoryOption  } = props;
    const selectedTabMenuItem = tabMenuList.find(p => p.key === selectedTabMenu);
    const isActiveTabMenu = (selectedTabMenu, tabMenuItem) => {
        return selectedTabMenu && selectedTabMenu.key === tabMenuItem.key;
    }

    return (
        <div className="tab-menu">
            <ul >
                {
                    tabMenuList.map(item => {
                        return (
                            <TabMenuItem key={item.key} item={item}
                                isActive={isActiveTabMenu(selectedTabMenuItem, item)}
                                onClickTabMenu={onClickTabMenu}
                                historyOption={historyOption}
                                handleChangeHistoryOption={handleChangeHistoryOption} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default React.memo(TabMenu);