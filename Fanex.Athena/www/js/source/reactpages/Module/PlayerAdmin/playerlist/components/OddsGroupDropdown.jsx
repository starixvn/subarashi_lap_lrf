import React, { useState } from 'react';
import { DropdownButton, DropdownItem } from '../../../../components/dropdown';
import {oddsGroupListWithStyle} from '../lib/constants';

const SpecialLevelDropdown = (props) => {
    const { position, onClose } = props;

    const toggleButton = {
        className: 'toggle-dropdown btn-outline',
        caret: false
    }

    const isOpen = position !== null;

    return (
        <DropdownButton className="oddsgroup-menu" isOpen={isOpen}
            style={{ top: position && position.y, left: position && position.x }}
            toggleButton={toggleButton} onClose={onClose}>
        {
            Object.keys(oddsGroupListWithStyle).map(item => {
                const style = oddsGroupListWithStyle[item];

                return <DropdownItem className="oddsgroup-item" style={style}>{item}</DropdownItem>
            })
        }
        </DropdownButton>
    )
}

export default React.memo(SpecialLevelDropdown);