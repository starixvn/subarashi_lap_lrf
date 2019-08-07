import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import { oddsGroupListWithStyle } from '../../lib/constants';
import GridInteractionService from '../../lib/gridInteractionService';
import LangHelper from '@jsroot/lib/langHelper';
import { ActionCreators } from '../../actions';
import { getErrorMessageForUpdating } from '../../lib/utils';

export const OddsGroupDropdown = (props) => {
    const { oddsGroupDropdownPosition, setOddsGroupDropdownPosition } = props;
    const isOpen = oddsGroupDropdownPosition !== null;

    const style = oddsGroupDropdownPosition && {
        top: oddsGroupDropdownPosition.y,
        left: oddsGroupDropdownPosition.x
    }

    const handleClose = () => {
        setOddsGroupDropdownPosition(null);
    }

    const { currentActivePlayer, updateOddsGroup, playerList, setPlayerList, toggleLoader } = props;
    const handleChangeOddsGroup = (event, value) => {
        event.preventDefault();
        const confirmMessage = LangHelper.getSingleResource('AlertSetOddsGroupForCustomerMsg').replace('{0}', value);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        if (currentActivePlayer && value !== currentActivePlayer.oddsGroup) {
            const { custId } = currentActivePlayer;
            const param = {
                custId,
                oddsGroup: value
            }

            toggleLoader(true);
            updateOddsGroup(param).then(response => {
                const { Success, Message, ErrorMessage } = response.data;
                if (Success) {
                    const newPlayerList = GridInteractionService.updatePlayerItem(playerList, custId, value, 'OddsGroup');
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
        <div className="dropdown oddsgroup-menu" style={style}>
            <DropdownMenu isOpen={isOpen} onClose={handleClose}>
                {
                    Object.keys(oddsGroupListWithStyle).map(item => {
                        const style = oddsGroupListWithStyle[item];

                        return <DropdownItem key={item} className="oddsgroup-item" style={style}
                            onClick={e => handleChangeOddsGroup(e, item)}>{item}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setOddsGroupDropdownPosition, updateOddsGroup, setPlayerList, toggleLoader } = ActionCreators;
    return bindActionCreators({ setOddsGroupDropdownPosition, updateOddsGroup, setPlayerList, toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { oddsGroupDropdownPosition, currentActivePlayer, playerList } = state;
    return Object.assign({}, { oddsGroupDropdownPosition, currentActivePlayer, playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(OddsGroupDropdown);