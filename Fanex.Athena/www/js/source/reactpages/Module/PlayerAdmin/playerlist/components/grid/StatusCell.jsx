import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playerStatus } from '../../lib/constants';
import { ActionCreators } from '../../actions';
import GridInteractionService from '../../lib/gridInteractionService';

export const StatusCell = (props) => {
    const { dataItem, statusDropdownPosition, setCurrentActivePlayer, setStatusDropdownPosition } = props;
    const { Status, IsOnline } = dataItem;

    const statusName = playerStatus[Status];
    const classname = 'status-text ' + statusName;
    const isArchived = Status === '3';

    const handleToggleStatus = (event) => {
        setCurrentActivePlayer({ custId: dataItem.CustId });
        const newPosition = GridInteractionService.getNextDropdownPosition(event.target, statusDropdownPosition);
        setStatusDropdownPosition(newPosition);
    }

    return (
        <div className="status-cell">
            <p className={classname}>{statusName || 'Unknown'}</p>
            <p className="status-text">{IsOnline ? '(Online)' : '(Offline)'}</p>
            {!isArchived && <button type="button" className="btn-outline btn-status-menu" onClick={handleToggleStatus}><i className="site-caret"></i></button>}
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