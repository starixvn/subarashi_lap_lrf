import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { contextMenuList } from '../../lib/constants';


const ContextMenu = (props) => {
    const { position, isOpenContextMenu, setSelectedPlayer, currentActivePlayer, setSelectedTabName, getTabList } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(isOpenContextMenu);
    }

    const handleClickMenu = (tabName) => {
        setSelectedTabName(tabName);
        setSelectedPlayer({...currentActivePlayer});
    }

    const style = position && {
        top: position.y,
        left: position.x - 10
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
    const { currentActivePlayer } = state;
    return Object.assign({}, { currentActivePlayer });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ContextMenu));