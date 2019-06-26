import React, { useState } from 'react';
import { DropdownButton, DropdownItem } from '../../../../components/dropdown';
import {specialLevelListWithColor} from '../lib/constants';

const SpecialLevelDropdown = (props) => {
    const getLabel = (level) => {
        return level === '0' ? 'None' : level;
    }

    const { position, onClose } = props;

    const toggleButton = {
        className: 'toggle-dropdown btn-outline',
        caret: false
    }

    const isOpen = position !== null;

    return (
        <DropdownButton className="special-level-menu" isOpen={isOpen}
            style={{ top: position && position.y, left: position && position.x }}
            toggleButton={toggleButton} onClose={onClose}>
        {
            Object.keys(specialLevelListWithColor).map(item => {
                const color = specialLevelListWithColor[item];

                return <DropdownItem className="special-level-item" style={{backgroundColor: color}}>{getLabel(item)}</DropdownItem>
            })
        }
        </DropdownButton>
    )
}

export default React.memo(SpecialLevelDropdown);