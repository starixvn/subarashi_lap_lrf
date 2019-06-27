import React from 'react';
import { DropdownMenu, DropdownItem } from '../../../../components/dropdown';
import { specialLevelListWithColor } from '../lib/constants';

const SpecialLevelDropdown = (props) => {
    const getLabel = (level) => {
        return level === '0' ? 'None' : level;
    }

    const { position, onClose } = props;
    const isOpen = position !== null;
    const style = position && {
        top: position.y + 20,
        left: position.x
    }

    return (
        <div className="dropdown special-level-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={onClose}>
                {
                    Object.keys(specialLevelListWithColor).map(item => {
                        const color = specialLevelListWithColor[item];
                        return <DropdownItem key={item} className="special-level-item" 
                                style={{ backgroundColor: color }}>{getLabel(item)}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

export default React.memo(SpecialLevelDropdown);