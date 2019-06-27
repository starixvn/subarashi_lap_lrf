import React from 'react';
import { DropdownMenu, DropdownItem } from '../../../../components/dropdown';
import { oddsGroupListWithStyle } from '../lib/constants';

const SpecialLevelDropdown = (props) => {
    const { position, onClose } = props;
    const isOpen = position !== null;

    const style = position && {
        top: position.y + 20,
        left: position.x
    }

    return (
        <div className="dropdown oddsgroup-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={onClose}>
                {
                    Object.keys(oddsGroupListWithStyle).map(item => {
                        const style = oddsGroupListWithStyle[item];

                        return <DropdownItem key={item} className="oddsgroup-item" style={style}>{item}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

export default React.memo(SpecialLevelDropdown);