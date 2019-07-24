import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playerStatus, playerStatusByName } from '../../lib/constants';
import { ActionCreators } from '../../actions';
import GridInteractionService from '../../lib/gridInteractionService';
import { buildCurrentActivePlayer } from '../../lib/utils';

export const StatusCell = (props) => {
    const { dataItem, statusDropdownPosition, setCurrentActivePlayer, setStatusDropdownPosition } = props;
    const { Status, IsOnline } = dataItem;

    const statusName = playerStatus[Status];
    const classname = 'status-text ' + statusName;
    const canUpdate = Status !== playerStatusByName.Archived && Status !== playerStatusByName.Closed;

    const handleToggleStatus = (event) => {
        const currentActivePlayer = buildCurrentActivePlayer(dataItem);
        setCurrentActivePlayer(currentActivePlayer);
        const newPosition = GridInteractionService.getNextDropdownPosition(event.target, statusDropdownPosition);
        setStatusDropdownPosition(newPosition);
    }

    const shouldShowOnlineStatus = dataItem.SystemId && Status === playerStatusByName.Active;

    return (
        <div className="status-cell">
            <p className={classname}>{statusName || 'Unknown'}</p>
            {shouldShowOnlineStatus && <p className="status-text">{IsOnline ? '(Online)' : '(Offline)'}</p>}
            {canUpdate && <button type="button" className="btn-outline btn-status-menu" onClick={handleToggleStatus}><i className="site-caret"></i></button>}
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setCurrentActivePlayer, setStatusDropdownPosition } = ActionCreators;
    return bindActionCreators({ setCurrentActivePlayer, setStatusDropdownPosition }, dispatch);
}

function mapStateToProps(state) {
    const { statusDropdownPosition } = state;
    return Object.assign({}, { statusDropdownPosition });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StatusCell));