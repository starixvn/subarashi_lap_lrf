import React, { useState } from 'react';
import { DropdownButton, DropdownItem } from '../../../../components/dropdown';

const ContextMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    }

    const handleMouseLeave = () => {
        setIsOpen(props.isOpenContextMenu);
    }

    const toggleButton = {
        className: 'btn-outline',
        caret: false
    }

    const { position } = props;

    return (
        (<DropdownButton className="context-menu" style={{ top: position && position.y, left: position && position.x - 10 }}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            isOpen={isOpen} toggleButton={toggleButton}>
            <DropdownItem>Note</DropdownItem>
            <DropdownItem>Password</DropdownItem>
            <DropdownItem>Fundtransfer Limit</DropdownItem>
            <DropdownItem>Bet Limit</DropdownItem>
            <DropdownItem>Statement</DropdownItem>
            <DropdownItem>Personal Message</DropdownItem>
        </DropdownButton>)
    )
}

export default React.memo(ContextMenu);