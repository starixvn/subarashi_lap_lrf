import React from 'react';
import { playerStatus } from '../../lib/constants';

export const StatusCell = (props) => {
    const {value, isOnline, handleToggleStatus} = props;

    const statusName = playerStatus[value];
    const classname = 'status-text ' + statusName;
    const isArchived = value === '3';

    return (
        <div className="status-cell">
            <p className={classname}>{statusName || 'Unknown'}</p>
            <p className="status-text">{isOnline ? '(Online)' : '(Offline)'}</p>
            {!isArchived && <button type="button" className="btn-outline btn-status-menu" onClick={handleToggleStatus}><i className="site-caret"></i></button>}
        </div>
    )
}

export default React.memo(StatusCell);