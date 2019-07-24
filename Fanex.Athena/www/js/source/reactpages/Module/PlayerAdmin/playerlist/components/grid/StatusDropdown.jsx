import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { playerStatus, displayedPlayerStatusList, messageUpdateState } from '../../lib/constants';
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

    const { currentActivePlayer, playerList, setPlayerList, toggleLoader, updatePlayerStatus } = props;
    const handleChangeOddsGroup = (event, value) => {
        event.preventDefault();
        const messageConfirm = messageUpdateState[value];
        if (currentActivePlayer && window.confirm(messageConfirm)) {
            const { custId } = currentActivePlayer;
            const param = {
                custId,
                status: value
            }

            toggleLoader(true);
            updatePlayerStatus(param).then(response => {
                const { IsSuccessful } = response.data;
                if (IsSuccessful) {
                    const newPlayerList = GridInteractionService.updatePlayerItem(playerList, custId, value, 'Status');
                    setPlayerList(newPlayerList);
                }

                const resultMessage = IsSuccessful ? 'Update successfully!' : 'Please try again!';
                window.alert(resultMessage);

                toggleLoader(false);
            }).catch(error => {
                console.log(error);
                toggleLoader(false);
            })

        }

        handleClose();
    }

    const displayedStatusList = currentActivePlayer && displayedPlayerStatusList[currentActivePlayer.status];

    if (!displayedStatusList) {
        return null;
    }

    return (
        <div className="dropdown status-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={handleClose}>
                {
                    displayedStatusList.map(item => {
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
    const { setStatusDropdownPosition, setPlayerList, toggleLoader, updatePlayerStatus } = ActionCreators;
    return bindActionCreators({ setStatusDropdownPosition, setPlayerList, toggleLoader, updatePlayerStatus }, dispatch);
}

function mapStateToProps(state) {
    const { statusDropdownPosition, currentActivePlayer, playerList } = state;
    return Object.assign({}, { statusDropdownPosition, currentActivePlayer, playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StatusDropdown));