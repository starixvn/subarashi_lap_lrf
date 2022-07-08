
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LangHelper from '@jsroot/lib/langHelper'
import NumberFormat from '@jsroot/lib/numberFormat';
import { ActionCreators } from '../actions'
import { generateDefaultConfirmOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import StringHelper from '@jsroot/lib/stringHelper';
import { BatchUpdateMonitoredPlayerAlertOption } from '../helper/sweetAlertHelper';
import MonitoredPlayerService from '../lib/queryService';
import { UpdateMonitoredPlayerCode } from '../lib/constants';
import MessageHelper from '../helper/messageHelper';

export const FormAdd = props => {
    const { toggleLoader, setSweetAlertOption, onClose, setCurrentUserAction, _resultMsgSubmit, _monitoredPlayer,  } = props;
    const [monitoredPlayer, setMonitoredPlayer] = useState(_monitoredPlayer || {})
    const [resultMsgSubmit, setResultMsgSubmit] = useState(_resultMsgSubmit)

    const _handleCloseAlert = () => {
        setSweetAlertOption(null);
        _backToFormAdd();
    }

    const _cancelProps = {
        onClick: _handleCloseAlert
    }

    const _backToFormAdd = (resultMsgSubmit) => {
        setCurrentUserAction({ type: 1, data: { _monitoredPlayer: monitoredPlayer, _resultMsgSubmit: resultMsgSubmit }});
    }

    const _insertMonitoredPlayer = async (params, afterSuccess) => {
        toggleLoader(true);
        const response = await MonitoredPlayerService.insertMonitoredPlayer(params);
        afterSuccess && afterSuccess(response);
        toggleLoader(false);
    }

    const _handleSubmit = async () => {
        const { winningThreshold, externalId, systemId } = monitoredPlayer;

        if (!(StringHelper.isEmptyOrWhiteSpace(externalId) ^ StringHelper.isEmptyOrWhiteSpace(systemId))) {
            setResultMsgSubmit(MessageHelper.GetListMsgUpdateMonitoredPlayer({ errorCode: UpdateMonitoredPlayerCode.InvalidUsernameInput }));
            return;
        }

        if (isNaN(winningThreshold) || !isFinite(winningThreshold) || winningThreshold <= 0) {
            setResultMsgSubmit(MessageHelper.GetListMsgUpdateMonitoredPlayer({ errorCode: UpdateMonitoredPlayerCode.InvalidWinningThreshold }));
            return;
        }

        const msgConfirm = LangHelper.getSingleResource('InsertMonitoredPlayerConfirm')
            .replace('{0}', systemId || externalId)
            .replace('{1}', NumberFormat.format(winningThreshold));

        let isSuccess = false;

        const batchUpdateSuccess = resultMsg => {
            setSweetAlertOption(null);
            if (!isSuccess) {
                _backToFormAdd(resultMsg);
            }
        }
        const handlerAfterBatchUpdateMonitoredPlayer = BatchUpdateMonitoredPlayerAlertOption.createHandlerAfterBatchUpdateMonitoredPlayer({ setSweetAlertOption, batchUpdateSuccess, noAlertResult: response => { return !(isSuccess = response.errorCode === UpdateMonitoredPlayerCode.Success) } });
        const confirmProps = BatchUpdateMonitoredPlayerAlertOption.createBatchUpdateMonitoredPlayerConfirmProps(monitoredPlayer, _insertMonitoredPlayer, handlerAfterBatchUpdateMonitoredPlayer);
        const alertOption = generateDefaultConfirmOption(msgConfirm, _handleCloseAlert, confirmProps, _cancelProps, predefinedIcons.warning, { height: 215, width: 500 });
        onClose() || setSweetAlertOption(alertOption);
    }

    const _renderButton = () => {
        return <div className="button-group">
            <button type="button" className="btn btn-apply" onClick={_handleSubmit}>{LangHelper.getSingleResource('Submit')}</button>
            <button type="button" className="btn" onClick={onClose}>{LangHelper.getSingleResource('Cancel')}</button>
        </div>
    }

    return (
        <div className="form-add">
            <div style={{ marginTop: !!resultMsgSubmit ? '0' : '10px' }}>
                {resultMsgSubmit}
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("SystemId")}</label>
                <div className="col-7" >
                    <input type="text" id="Name" name="Name" className={`input-text`} disabled={!StringHelper.isEmptyOrWhiteSpace(monitoredPlayer.externalId)}
                        maxLength={30}
                        autoComplete='off'
                        value={monitoredPlayer.systemId}
                        onChange={(event) => setMonitoredPlayer({ ...monitoredPlayer, systemId: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("ExternalId")}</label>
                <div className="col-7">
                    <input type="text" id="Name" name="Name" className={`input-text`} disabled={!StringHelper.isEmptyOrWhiteSpace(monitoredPlayer.systemId)}
                        maxLength={50}
                        autoComplete='off'
                        value={monitoredPlayer.externalId}
                        onChange={(event) => setMonitoredPlayer({ ...monitoredPlayer, externalId: event.target.value })} />
                </div>
            </div>
            <div className="row">
                <label className="col-5 label-text">{LangHelper.getSingleResource("CurrentWinningThreshold")}<span className="required">*</span></label>
                <div className="col-7">
                    <input type="text" id="Name" name="Name" className={`input-text`}
                        maxLength={10}
                        autoComplete='off'
                        value={NumberFormat.format(monitoredPlayer.winningThreshold)}
                        onChange={(event) => setMonitoredPlayer({ ...monitoredPlayer, winningThreshold: parseFloat(event.target.value.replace(/,/g, '')) })} />
                </div>
            </div>
            {_renderButton()}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    const { toggleLoader, setSweetAlertOption, setCurrentUserAction } = ActionCreators;
    return bindActionCreators(Object.assign({}, {
        toggleLoader,
        setSweetAlertOption,
        setCurrentUserAction
    }), dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(FormAdd));