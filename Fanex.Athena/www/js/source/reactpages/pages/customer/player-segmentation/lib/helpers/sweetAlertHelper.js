import GridHelper from './gridHelper';
import { generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import LangHelper from '@jsroot/lib/langHelper';
import MessageHelper from './messageHelper';
import { errorCode } from '../constants';

export const UpdateVipStatusAlertOption = {

    createHandlerAfterUpdateVipStatusSuccess: ({ setSweetAlertOption, searchPlayer, selectedTabKey, setPagingOption, pagingOption, selectedParams }) => () => {
        setSweetAlertOption(null);
        searchPlayer(selectedTabKey, selectedParams, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    },

    createHandlerAfterUpdateVipStatus: ({ setSweetAlertOption, handlerUpdateVipStatusSuccess, isUpdateVip, noAlertResult, isSingleUpdate }) => response => {
        let alertOpt;
        if (response.isSuccess) {
            const resultMessage = MessageHelper.GetListMsgUpdateVipStatus(response.data, isUpdateVip, isSingleUpdate);
            alertOpt = noAlertResult ? handlerUpdateVipStatusSuccess(resultMessage) : generateDefaultAlertOption(resultMessage, handlerUpdateVipStatusSuccess, null, predefinedIcons.success);
            !noAlertResult && setSweetAlertOption(alertOpt);
        } else {
            let message = LangHelper.getSingleResource('ErrorProcessingMsg');
            let icon = predefinedIcons.error;

            if (response.errorCode === errorCode.serviceMaintenance) {
                message = LangHelper.getSingleResource('ServiceMaintenanceMsg');
                icon = predefinedIcons.warning;
            }

            alertOpt = generateDefaultAlertOption(message, () => setSweetAlertOption(null), null, icon);
            setSweetAlertOption(alertOpt);
        }
    },

    createUpdateVipStatusConfirmProps: ({ params, updateVipStatus, handlerAfterUpdateVipStatus }) => ({
        onClick: () => {
            updateVipStatus(params, handlerAfterUpdateVipStatus);
        }
    })
}