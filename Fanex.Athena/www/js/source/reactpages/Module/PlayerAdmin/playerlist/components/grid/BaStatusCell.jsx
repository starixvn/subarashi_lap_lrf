import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import LangHelper from '@jsroot/lib/langHelper';
import GridInteractionService from '../../lib/gridInteractionService';
import { getErrorMessageForUpdating } from '../../lib/utils';
import { generateDefaultConfirmOption, generateDefaultAlertOption, predefinedIcons } from '../../../../../lib/sweetAlert';

const BaStatusCell = (props) => {
    const { dataItem, setPlayerList, toggleLoader, updateBaStatus, setSweetAlertOption } = props;
    const { CustId, BaStatus, OddsGroup, IsArchived } = dataItem;

    const handleChangeBaStatus = (event) => {
        const isBa = event.target.checked;
        const resourceName = isBa ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);

        const handleCloseAlert = () => {
            setSweetAlertOption(null);
        }

        const cancelProps = {
            onClick: handleCloseAlert
        }

        const confirmProps = {
            onClick: () => {
                const param = { custId: CustId, isBa };
                toggleLoader(true);
                updateBaStatus(param).then(response => {
                    const { Success, Message, ErrorMessage, ExtendedData } = response.data;
                    if (Success) {
                        const oddsGroup = ExtendedData || OddsGroup;
                        const newPlayerList = GridInteractionService.updatePlayerWithBaStatus(playerList, CustId, isBa, oddsGroup);
                        setPlayerList(newPlayerList);
                    }

                    const resultMessage = Success ? LangHelper.getSingleResource('UpdateSuccess') : (Message || LangHelper.getSingleResource(ErrorMessage));
                    const displayIcon = Success ? predefinedIcons.success : predefinedIcons.error;
                    const alertOpt = generateDefaultAlertOption(resultMessage, handleCloseAlert, null, displayIcon);
                    setSweetAlertOption(alertOpt);

                    toggleLoader(false);
                }).catch((error) => {
                    console.log(error.message);
                    const message = getErrorMessageForUpdating(error);
                    const alertOpt = generateDefaultAlertOption(message, handleCloseAlert, null, predefinedIcons.error);
                    setSweetAlertOption(alertOpt);
                    toggleLoader(false);
                })
            }
        }

        const confirmOption = generateDefaultConfirmOption(confirmMessage, handleCloseAlert, confirmProps, cancelProps);

        setSweetAlertOption(confirmOption);
    }

    return (
        <Cell className="center-align">
            {!IsArchived && BaStatus !== undefined && <Switcher checked={BaStatus} onChange={handleChangeBaStatus} />}
        </Cell>
    )
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList, toggleLoader, updateBaStatus, setSweetAlertOption } = ActionCreators;
    return bindActionCreators({ setPlayerList, toggleLoader, updateBaStatus, setSweetAlertOption }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(BaStatusCell);