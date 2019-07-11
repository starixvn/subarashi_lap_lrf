import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { playerStatus } from '../../lib/constants';
import GridInteractionService from '../../lib/gridInteractionService';
import { ActionCreators } from '../../actions';

const StatusDropdown = (props) => {
    const { statusDropdownPosition, setStatusDropdownPosition } = props;
    const isOpen = statusDropdownPosition !== null;
    const style = statusDropdownPosition && {
        top: statusDropdownPosition.y,
        left: statusDropdownPosition.x
    }

    const handleClose = () => {
        setStatusDropdownPosition(null);
    }

    const { currentActivePlayer, playerList, setPlayerList, toggleLoader } = props;
    const handleChangeOddsGroup = (event, value) => {
        event.preventDefault();
        if (currentActivePlayer) {
            const { custId } = currentActivePlayer;
            const param = {
                custId,
                status: value
            }

            toggleLoader(true);
            const newPlayerList = GridInteractionService.updatePlayerItem(playerList, custId, value, 'Status');
            setPlayerList(newPlayerList);
            toggleLoader(false);
        }

        handleClose();
    }

    return (
        <div className="dropdown status-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={handleClose}>
                {
                    Object.keys(playerStatus).map(item => {
                        const statusName = playerStatus[item];
                        const classname = 'status-item ' + statusName;
                        return <DropdownItem key={item} className={classname} onClick={e => handleChangeOddsGroup(e, item)}>{statusName}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setStatusDropdownPosition, setPlayerList, toggleLoader } = ActionCreators;
    return bindActionCreators({ setStatusDropdownPosition, setPlayerList, toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { statusDropdownPosition, currentActivePlayer, playerList } = state;
    return Object.assign({}, { statusDropdownPosition, currentActivePlayer, playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StatusDropdown));