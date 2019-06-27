import React, { useState } from 'react';
import { DropdownMenu, DropdownItem } from '../../../../components/dropdown';

const ContextMenu = (props) => {
    const { position, isOpenContextMenu } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(isOpenContextMenu);
    }

    const style = position && {
        top: position.y,
        left: position.x - 10
    }

    return (
        <div className="dropdown context-menu" style={style}>
            <DropdownMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isOpen={isOpenContextMenu || isOpen}>
                <DropdownItem>Note</DropdownItem>
                <DropdownItem>Password</DropdownItem>
                <DropdownItem>Fundtransfer Limit</DropdownItem>
                <DropdownItem>Bet Limit</DropdownItem>
                <DropdownItem>Statement</DropdownItem>
                <DropdownItem>Personal Message</DropdownItem>
            </DropdownMenu>
        </div>
    )
}

export default React.memo(ContextMenu);