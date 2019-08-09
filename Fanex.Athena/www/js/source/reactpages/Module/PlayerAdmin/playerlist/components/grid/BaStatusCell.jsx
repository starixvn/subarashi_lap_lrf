import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import LangHelper from '@jsroot/lib/langHelper';
import GridInteractionService from '../../lib/gridInteractionService';
import { getErrorMessageForUpdating } from '../../lib/utils';

const generateConfirmOption = (content) => {
    return {
        buttons: [
            {
                text: LangHelper.getSingleResource('Submit'),
                className: 'btn btn-apply'
            },
            {
                text: LangHelper.getSingleResource('Cancel'),
                className: 'btn'
            }
        ],
        icon: 'warning',
        isShow: true,
        children: (<p className="center-align">{content}</p>)
    }
}

const alertOption = {
    buttons: [
        {
            text: LangHelper.getSingleResource('OK'),
            className: 'btn btn-apply'
        }
    ],
    icon: 'success',
    isShow: true,
    children: (<p className="center-align">{LangHelper.getSingleResource('UpdateSuccess')}</p>)
}
const BaStatusCell = (props) => {
    const { dataItem, setPlayerList, toggleLoader, updateBaStatus, setSweetAlertOption } = props;
    const { CustId, BaStatus, OddsGroup } = dataItem;

    const handleChangeBaStatus = (event) => {
        const isBa = event.target.checked;
        const resourceName = isBa ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);
        const confirmOption = generateConfirmOption(confirmMessage);

        const handleCloseAlert = () => {
            setSweetAlertOption(null);
        }

        const submitButton = confirmOption.buttons[0];
        confirmOption.buttons[0] = {
            ...submitButton,
            onClick: () => {
                const alertOpt = {
                    ...alertOption,
                    onClose: handleCloseAlert
                }
                alertOpt.buttons[0].onClick = handleCloseAlert;
                setSweetAlertOption(alertOpt);
            }
        }

        const cancelButton = confirmOption.buttons[1];
        confirmOption.buttons[1] = {
            ...cancelButton,
            onClick: handleCloseAlert
        }

        confirmOption.onClose = () => {
            setSweetAlertOption(null);
            console.log('close');
        }

        setSweetAlertOption(confirmOption);

        return;
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const param = { custId: CustId, isBa };
        toggleLoader(true);
        updateBaStatus(param).then(response => {
            const { Success, Message, ErrorMessage, ExtendedData } = response.data;
            if (Success) {
                const oddsGroup = ExtendedData || OddsGroup;
                const newPlayerList = GridInteractionService.updatePlayerWithBaStatus(playerList, CustId, isBa, oddsGroup);
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

    return (
        <Cell className="center-align">
            {BaStatus !== undefined && <Switcher checked={BaStatus} onChange={handleChangeBaStatus} />}
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