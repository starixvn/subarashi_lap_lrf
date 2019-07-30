import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { contextMenuList } from '../../lib/constants';


export const ContextMenu = (props) => {
    const { setSelectedPlayer, currentActivePlayer, setSelectedTabName, getTabList, contextMenu } = props;
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

        const { custId, userName, currency } = currentActivePlayer;
        const selectedPlayer = { custId, userName, currency };
        setSelectedPlayer(selectedPlayer);
    }

    const style = position && {
        top: position.y,
        left: position.x
    }

    const tabList = getTabList();
    const activeMenuList = contextMenuList.filter(item => !!tabList.find(t => item.tabName === t.Name));

    return (
        <div className="dropdown context-menu" style={style}>
            <DropdownMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isOpen={isOpenContextMenu || isOpen}>
                {
                    activeMenuList.map(item => {
                        return <DropdownItem key={item.key} onClick={() => handleClickMenu(item.tabName)}>{item.name}</DropdownItem>
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
    const { currentActivePlayer, contextMenu } = state;
    return Object.assign({}, { currentActivePlayer, contextMenu });
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);