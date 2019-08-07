import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { specialLevelListWithColor } from '../../lib/constants';
import GridInteractionService from '../../lib/gridInteractionService';
import LangHelper from '@jsroot/lib/langHelper';
import { ActionCreators } from '../../actions';
import { getSpecialLevelText, getErrorMessageForUpdating } from '../../lib/utils';

const SpecialLevelDropdown = (props) => {
    const { specialLevelDropdownPosition, setSpecialLevelDropdownPosition } = props;
    const isOpen = specialLevelDropdownPosition !== null;
    const style = specialLevelDropdownPosition && {
        top: specialLevelDropdownPosition.y,
        left: specialLevelDropdownPosition.x
    }

    const handleClose = () => {
        setSpecialLevelDropdownPosition(null);
    }

    const { currentActivePlayer, updateSpecialLevel, playerList, setPlayerList, toggleLoader } = props;
    const handleChangeOddsGroup = (event, value) => {
        event.preventDefault();
        const resourceName = Number(value) === 0 ? 'AlertRemoveSpecialLevelForCustomerMsg' : 'AlertSetSpecialLevelForCustomerMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        if (currentActivePlayer && value !== currentActivePlayer.specialLevel) {
            const { custId } = currentActivePlayer;
            const param = {
                custId,
                specialLevel: value
            }

            toggleLoader(true);
            updateSpecialLevel(param).then(response => {
                const { Success, Message, ErrorMessage } = response.data;
                if (Success) {
                    const newPlayerList = GridInteractionService.updatePlayerItem(playerList, custId, value, 'SpecialLevel');
                    setPlayerList(newPlayerList);
                    window.alert(LangHelper.getSingleResource('UpdateSuccess'));
                }
                else {
                    const errMsg = Message || LangHelper.getSingleResource(ErrorMessage);
                    window.alert(errMsg);
                }
                toggleLoader(false);
            }).catch((error) => {
                console.log(error.message);
                const message = getErrorMessageForUpdating(error);
                window.alert(message);
                toggleLoader(false);
            })
        }

        handleClose();
    }

    return (
        <div className="dropdown special-level-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={handleClose}>
                {
                    Object.keys(specialLevelListWithColor).map(item => {
                        const color = specialLevelListWithColor[item];
                        return <DropdownItem key={item} className="special-level-item"
                            style={{ backgroundColor: color }} onClick={e => handleChangeOddsGroup(e, item)}>{getSpecialLevelText(item)}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSpecialLevelDropdownPosition, updateSpecialLevel, setPlayerList, toggleLoader } = ActionCreators;
    return bindActionCreators({ setSpecialLevelDropdownPosition, updateSpecialLevel, setPlayerList, toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { specialLevelDropdownPosition, currentActivePlayer, playerList } = state;
    return Object.assign({}, { specialLevelDropdownPosition, currentActivePlayer, playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLevelDropdown);