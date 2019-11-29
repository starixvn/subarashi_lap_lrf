import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { getActiveTabList } from '../../lib/helpers/contextMenuHelper';

export const ContextMenu = (props) => {
    const { setSelectedPlayer, currentActivePlayer, setSelectedTabName, getTabList, contextMenu, type } = props;
    const { position, isOpen: isOpenContextMenu } = contextMenu;
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(isOpenContextMenu);
    }

    const handleClickMenu = (tabName) => {
        setSelectedTabName(tabName);
        const { ibcCustId, userName, currency, isDeposit, isArchived, licenseeCustId, currencyId, createdDate } = currentActivePlayer;
        const selectedPlayer = { ibcCustId, userName, currency, isDeposit, isArchived, licenseeCustId, currencyId, createdDate };
        setSelectedPlayer(selectedPlayer);
    }

    const style = position && {
        top: position.y,
        left: position.x
    }

    let activeMenuList = [];

    if (currentActivePlayer) {
        const tabList = getTabList();
        activeMenuList = getActiveTabList(currentActivePlayer, tabList, type);
    }

    return (
        <div className="dropdown context-menu" style={style}>
            <DropdownMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isOpen={isOpenContextMenu || isOpen}>
                {
                    activeMenuList.map(item => {
                        const subTabName = item.subTabName;
                        const selectedTabName = subTabName || item.tabName;

                        return <DropdownItem key={item.key} onClick={() => handleClickMenu(selectedTabName)}>{item.name}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setSelectedTabName, getTabList } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setSelectedTabName, getTabList }, dispatch);
}

function mapStateToProps(state) {
    const { currentActivePlayer, contextMenu, type } = state;
    return Object.assign({}, { currentActivePlayer, contextMenu, type });
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);