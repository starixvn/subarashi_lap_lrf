import GridHelper from './gridHelper';
import { generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import LangHelper from '@jsroot/lib/langHelper';
import MessageHelper from './messageHelper';

export const UpdateVipStatusAlertOption = {
    
    createHandlerAfterUpdateVipStatusSuccess: ({ setSweetAlertOption, searchPlayer, selectedTabKey, setPagingOption, pagingOption, selectedParams }) => () => {
        setSweetAlertOption(null);
        searchPlayer(selectedTabKey, selectedParams, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    },

    createHandlerAfterUpdateVipStatus: ({ setSweetAlertOption, handlerUpdateVipStatusSuccess, isUpdateVip, noAlertResult }) => response => {
        let alertOpt;
        if (response.isSuccess) {
            const resultMessage = MessageHelper.GetListMsgUpdateVipStatus(response.data, isUpdateVip);
            alertOpt = noAlertResult ? handlerUpdateVipStatusSuccess(resultMessage) : generateDefaultAlertOption(resultMessage, handlerUpdateVipStatusSuccess, null, predefinedIcons.success);
            !noAlertResult && setSweetAlertOption(alertOpt);
        } else {
            const message = LangHelper.getSingleResource('error');
            alertOpt = generateDefaultAlertOption(message, () => setSweetAlertOption(null), null, predefinedIcons.error);
            setSweetAlertOption(alertOpt);
        }
    },

    createUpdateVipStatusConfirmProps: ({ params, updateVipStatus, handlerAfterUpdateVipStatus }) => ({
        onClick: () => {
            updateVipStatus(params, handlerAfterUpdateVipStatus);
        }
    })

}