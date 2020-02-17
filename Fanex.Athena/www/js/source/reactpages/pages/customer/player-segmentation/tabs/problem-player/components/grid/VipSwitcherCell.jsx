import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import LangHelper from '@jsroot/lib/langHelper';
// import { getErrorMessageForUpdating } from '../../lib/helpers/utils';
import { generateDefaultConfirmOption, generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';

const VipSwitcherCell = (props) => {
    const { dataItem, setPlayerList, toggleLoader, updateVipTagging, setSweetAlertOption, playerList } = props;
    const { ExternalId, SystemId, IsVipTagging  } = dataItem;

    const _handleChangeVipTagging = (event) => {
        event.preventDefault();

        const handleCloseAlert = () => {
            setSweetAlertOption(null);
        }

        const isVipTagging = event.target.checked;
        const resourceName = isVipTagging ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);

        const cancelProps = {
            onClick: handleCloseAlert
        }

        const confirmProps = {
            onClick: () => {
                const param = { ExternalId, SystemId };
                toggleLoader(true);
                updateVipTagging(param).then(response => {
                    const { Success, Message, ErrorMessage } = response.data;
                    if (Success) {
                        dataItem.isVipTagging = !dataItem.isVipTagging;
                        setPlayerList(newPlayerList);
                    }

                    const resultMessage = Success ? LangHelper.getSingleResource('UpdateSuccess') : (Message || LangHelper.getSingleResource(ErrorMessage));
                    const displayIcon = Success ? predefinedIcons.success : predefinedIcons.error;
                    const alertOpt = generateDefaultAlertOption(resultMessage, handleCloseAlert, null, displayIcon);
                    setSweetAlertOption(alertOpt);

                    toggleLoader(false);
                }).catch((error) => {
                    console.log(error.message);
                    const message = 'error';//getErrorMessageForUpdating(error);
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
        <Cell className={"center-align" + `${''}`}>
            <Switcher disabled={false} checked={IsVipTagging} onChange={_handleChangeVipTagging} />
        </Cell>
    )
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList, toggleLoader, updateVipTagging, setSweetAlertOption } = ActionCreators;
    return bindActionCreators({ setPlayerList, toggleLoader, updateVipTagging, setSweetAlertOption }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(VipSwitcherCell);