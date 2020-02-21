import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import LangHelper from '@jsroot/lib/langHelper';
import { generateDefaultConfirmOption, generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import {  warningIconMarkup } from '@jsroot/components/sweet-alert/icon';

// import { getErrorMessageForUpdating } from '../../lib/helpers/utils';

const VipSwitcherCell = (props) => {
    const { dataItem, setPlayerList, updateVipTagging, setSweetAlertOption, playerList } = props;
    const { systemId, isVipTagging, isMarkVoid  } = dataItem;

    const _handleCloseAlert = () => {
        setSweetAlertOption(null);
    }

    const _cancelProps = {
        onClick: _handleCloseAlert
    }

    const _confirmProps = {
        onClick: () => {
            const param = { systemId };
            updateVipTagging(param).then(response => {
                const isSucess = response.success;
                if (isSucess) {
                    dataItem.isVipTagging = !dataItem.isVipTagging;
                    setPlayerList([...playerList]);
                }
                const resultMessage = isSucess ? LangHelper.getSingleResource('UpdateSuccess') : (Message || LangHelper.getSingleResource(ErrorMessage));
                const displayIcon = isSucess ? predefinedIcons.success : predefinedIcons.error;
                const alertOpt = generateDefaultAlertOption(resultMessage, _handleCloseAlert, null, displayIcon);
                setSweetAlertOption(alertOpt);
            })
                .catch(error => {
                    const message = 'error';//getErrorMessageForUpdating(error);
                    const alertOpt = generateDefaultAlertOption(message, _handleCloseAlert, null, predefinedIcons.error);
                    setSweetAlertOption(alertOpt);
                })
        }
    }

    
    const _handleChangeVipTagging = (event) => {
        event.preventDefault();
        const checked = event.target.checked;
        const confirmMessage = LangHelper.getSingleResource(checked ? 'AlertTurnOnTaggingVip' : 'AlertTurnOfTaggingVip');
        const confirmOption = generateDefaultConfirmOption(confirmMessage, _handleCloseAlert, _confirmProps, _cancelProps);
        setSweetAlertOption(confirmOption);
    }

    const a = warningIconMarkup();


    return (
        <Cell className={"center-align"}>
             <Switcher disabled={false} checked={isVipTagging} onChange={_handleChangeVipTagging} />
        </Cell>
    )
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList, updateVipTagging, setSweetAlertOption } = ActionCreators;
    return bindActionCreators({ setPlayerList, updateVipTagging, setSweetAlertOption }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(VipSwitcherCell));