import GridHelper from '../../../lib/helpers/gridHelper';
import { generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import LangHelper from '@jsroot/lib/langHelper';
import MessageHelper from './messageHelper';

export const BatchUpdateMonitoredPlayerAlertOption = {
    
    createHandlerAfterBatchUpdateMonitoredPlayerSuccess: ({ setSweetAlertOption, searchPlayer, selectedTabKey, setPagingOption, pagingOption, selectedParams }) => () => {
        setSweetAlertOption(null);
        searchPlayer(selectedTabKey, selectedParams, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    },

    createHandlerAfterBatchUpdateMonitoredPlayer: ({ setSweetAlertOption, batchUpdateSuccess, noAlertResult, onFail }) => response => {
        let alertOpt;
        if (response.isSuccess) {
            const resultMessage = MessageHelper.GetListMsgUpdateMonitoredPlayer(response.data);
            noAlertResult = typeof noAlertResult === 'function' ? noAlertResult(response.data) : noAlertResult;
            alertOpt = noAlertResult ? batchUpdateSuccess(resultMessage) : generateDefaultAlertOption(resultMessage, batchUpdateSuccess, null, predefinedIcons.success);
            !noAlertResult && setSweetAlertOption(alertOpt);
        } else {
            const message = LangHelper.getSingleResource('ErrorProcessingMsg');
            alertOpt = generateDefaultAlertOption(message, () => { setSweetAlertOption(null); onFail && onFail() }, null, predefinedIcons.error);
            setSweetAlertOption(alertOpt);
        }
    },

    createBatchUpdateMonitoredPlayerConfirmProps: (params, batchUpdateMonitoredPlayer, handlerAfterBatchUpdate) => ({
        onClick: () => {
            batchUpdateMonitoredPlayer(params, handlerAfterBatchUpdate);
        }
    })
}