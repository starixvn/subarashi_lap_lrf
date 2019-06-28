import React from 'react';
import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { playerStatus } from '../../lib/constants';

const StatusDropdown = (props) => {
    const { position, onClose, onChange } = props;
    const isOpen = position !== null;
    const style = position && {
        top: position.y,
        left: position.x
    }

    return (
        <div className="dropdown status-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={onClose}>
                {
                    Object.keys(playerStatus).map(item => {
                        const statusName = playerStatus[item];
                        const classname = 'status-item ' + statusName;
                        return <DropdownItem key={item} className={classname} onClick={e => onChange(e, item)}>{statusName}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

export default React.memo(StatusDropdown);