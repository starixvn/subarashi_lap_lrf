import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Cell } from '@9softstudio/react-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import NumberFormat from '@jsroot/lib/numberFormat';
import LangHelper from '@jsroot/lib/langHelper'
import { generateDefaultConfirmOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import MonitoredPlayerService from '../../lib/queryService';
import { BatchUpdateMonitoredPlayerAlertOption } from '../../helper/sweetAlertHelper';
import { UpdateMonitoredPlayerCode } from '../../lib/constants';

const ThresholdCell = props => {
    const { player, canEdit, toggleLoader, setSweetAlertOption } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [winningThreshold, setWinningThreshold] = useState(player.currentWinningThreshold);
    const inputRef = useRef(null);
    let prevTimer = 0;

    useEffect(() => {
        _reset();
    }, [player])

    useEffect(() => {
        isEditing && inputRef && inputRef.current && inputRef.current.focus();
    }, [isEditing])

    const _updateMonitoredPlayer = async (params, afterSuccess) => {
        toggleLoader(true);
        const response = await MonitoredPlayerService.updateMonitoredPlayer(params);
        afterSuccess && afterSuccess(response);
        toggleLoader(false);
    }

    const _onUpdateMonitoredPlayer = () => {
        const _handleCloseAlert = () => {
            setSweetAlertOption(null);
            _reset();
        }
        const _cancelProps = {
            onClick: _handleCloseAlert
        }

        let isSuccess = false;
        const batchUpdateSuccess = () => {
            setSweetAlertOption(null);
            if (isSuccess) {
                player.currentWinningThreshold = winningThreshold;
            }
            _reset();
        };

        const noAlertResult = response => {
            isSuccess = response.errorCode === UpdateMonitoredPlayerCode.Success
            return false;
        };

        const params = { custId: player.custId, winningThreshold };

        const handlerAfterBatchUpdateMonitoredPlayer = BatchUpdateMonitoredPlayerAlertOption.createHandlerAfterBatchUpdateMonitoredPlayer({ setSweetAlertOption, batchUpdateSuccess, noAlertResult, onFail: _handleCloseAlert });
        const confirmProps = BatchUpdateMonitoredPlayerAlertOption.createBatchUpdateMonitoredPlayerConfirmProps(params, _updateMonitoredPlayer, handlerAfterBatchUpdateMonitoredPlayer);
        const alertOption = generateDefaultConfirmOption(LangHelper.getSingleResource('ConfirmUpdateMonitoredPlayer').replace('{0}', player.currency).replace('{1}',  NumberFormat.format(winningThreshold)),
         _handleCloseAlert, confirmProps, _cancelProps, predefinedIcons.warning, { height: 210 });

        setSweetAlertOption(alertOption);
    }

    const _renderSubmit = () => {
        return <>
            <button class="btn-default btn-link btn-icon check-icon" onClick={event => {
                event.preventDefault();
                if (isNaN(winningThreshold) || !isFinite(winningThreshold) || winningThreshold <= 0) {
                    return;
                }
                prevTimer && clearTimeout(prevTimer);
                _onUpdateMonitoredPlayer();
            }} >
                <i class="material-icons">check</i>
            </button>
            <button class="btn-default btn-link btn-icon close-icon" >
                <i class="material-icons">close</i>
            </button>
        </>
    }

    const _reset = () => {
        isEditing && setIsEditing(false);
        winningThreshold !== player.currentWinningThreshold && setWinningThreshold(player.currentWinningThreshold)
    }

    const _onBlur = () => (prevTimer = setTimeout(() => {
       _reset();
    }, 150))

    return <Cell className="right-align action-cell threshold-cell">
        {canEdit && <div className="threshold-cell-action">{isEditing ? _renderSubmit() :
            <button className="btn-default btn-link btn-icon" onClick={() => setIsEditing(true)} >
                <i className="material-icons">edit</i>
            </button>}
        </div>}
        <input type="text" id="Name" name="Name" className={'input-text right-align'} disabled={!isEditing}
            ref={inputRef}
            onBlur={_onBlur}
            maxLength={10}
            autoComplete='off'
            value={NumberFormat.format(winningThreshold)}
            onChange={(event) => setWinningThreshold(parseFloat(event.target.value.replace(/,/g, '')))} />
    </Cell>;
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader, setSweetAlertOption, } = ActionCreators;
    return bindActionCreators({ toggleLoader, setSweetAlertOption }, dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(ThresholdCell));