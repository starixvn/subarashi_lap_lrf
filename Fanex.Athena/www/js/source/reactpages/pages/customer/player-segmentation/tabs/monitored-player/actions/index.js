import { SET_CURRENT_USER_ACTION } from './types';
import * as loaderAction from '@jsroot/actions/loaderAction';
import * as filterAction from './filterAction';
import * as userGuideAction from '@jsroot/actions/userGuideAction';
import * as gridHandlerAction from '../../../actions/gridHandlerAction';
import LangHelper from '@jsroot/lib/langHelper';
import { searchPlayer, setPlayerList } from '../../../actions/playerDataAction';
import { BatchUpdateMonitoredPlayerAlertOption } from '../helper/sweetAlertHelper';
import MonitoredPlayerService from '../lib/queryService';
import { generateDefaultConfirmOption, predefinedIcons } from '@jsroot/lib/sweetAlert';

const { setSweetAlertOption } = gridHandlerAction;
const { toggleLoader } = loaderAction;

const _removeMonitoredPlayer = dispatch => async (params, afterSuccess) => {
    dispatch(toggleLoader(true));
    const response = await MonitoredPlayerService.removeMonitoredPlayer(params);
    afterSuccess && afterSuccess(response);
    dispatch(toggleLoader(false));
}

const _onRemoveMonitoredList = dispatch => (custIds, systemIds, onSuccess) => {
    const setSweetAlertOptionWithDispatch = options => dispatch(setSweetAlertOption(options));
    const _handleCloseAlert = () => setSweetAlertOptionWithDispatch(null);
    const _cancelProps = {
        onClick: _handleCloseAlert
    }

    const batchUpdateSuccess = onSuccess;
    const handlerAfterBatchUpdateMonitoredPlayer = BatchUpdateMonitoredPlayerAlertOption.createHandlerAfterBatchUpdateMonitoredPlayer({ setSweetAlertOption: setSweetAlertOptionWithDispatch, batchUpdateSuccess, noAlertResult: false });
    const confirmProps = BatchUpdateMonitoredPlayerAlertOption.createBatchUpdateMonitoredPlayerConfirmProps({ custIds }, _removeMonitoredPlayer(dispatch), handlerAfterBatchUpdateMonitoredPlayer);
    const alertOption = generateDefaultConfirmOption(LangHelper.getSingleResource('DeleteMonitoredPlayerConfirm').replace('{0}', systemIds), _handleCloseAlert, confirmProps, _cancelProps,
     predefinedIcons.warning, { height: 215 });
    setSweetAlertOptionWithDispatch(alertOption);
}

const deleteMonitoredPlayer = (custIds, systemIds, onSuccess) => (dispatch) => _onRemoveMonitoredList(dispatch)(custIds, systemIds, onSuccess);

const setCurrentUserAction = data => ({
    type: SET_CURRENT_USER_ACTION,
    data
})

export const ActionCreators = Object.assign({},
    loaderAction,
    filterAction,
    userGuideAction,
    gridHandlerAction,
    { searchPlayer, setPlayerList, deleteMonitoredPlayer, setCurrentUserAction }
);