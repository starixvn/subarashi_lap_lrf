import DataService from '@jsroot/lib/DataService';
import ProblemPlayerService from '../tabs/problem-player/lib/queryService';
import VipPlayerService from '../tabs/vip-player-management/lib/queryService';
import MonitoredPlayerQueryService from '../tabs/monitored-player/lib/queryService';
import SabaVirtualPlayerQueryService from '../tabs/saba-virtual-setting/lib/queryService';

import { tabKeys, errorResponse, successResponse, errorCode } from './constants';

class CommonQueryService {
    static async updateVipStatus(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/UpdateVipStatus', params);
            if (response.status === 200 && response.data !== null) {
                return {
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
            // Service Maintenance
            if (response.status === 200) {
                return { ...errorResponse, errorCode: errorCode.serviceMaintenance };
            }
        }
        catch (e) {
            console.log(e)
        }
        return { ...errorResponse, errorCode: errorCode.serviceError };
    }
}

export const queryServiceCommonFactory = {
    [tabKeys.problemPlayer]: {
        getPlayerList: ProblemPlayerService.getPlayerList,
    },
    [tabKeys.sabaVirtualSetting]: {
        getPlayerList: SabaVirtualPlayerQueryService.getPlayerList
    },
    [tabKeys.vipPlayerManagement]: {
        getPlayerList: VipPlayerService.getPlayerList
    },
    [tabKeys.monitoredPlayer]: {
        getPlayerList: MonitoredPlayerQueryService.getMontioredPlayerList
    },
    common: {
        updateVipStatus: CommonQueryService.updateVipStatus
    }
}
