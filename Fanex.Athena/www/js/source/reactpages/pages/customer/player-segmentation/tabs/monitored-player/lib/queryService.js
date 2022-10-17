import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site';
import { errorResponse, successResponse } from '../../../lib/constants';

export default class MonitoredPlayerService {
    static async getMontioredPlayerList(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/GetMonitoredPlayerList', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...response.data
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse;
    }

    static async exportMontioredPlayerList(params) {
        try {
            const response = await DataService.getFile('Api/PlayerSegmentation/ExportMonitoredPlayerList', params);
            if (response.status === 204) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'ThresholdMonitoringSetting.xls');
            }
        } catch (e) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            console.log(e)
        }
    }

    static async downloadMonitoredTemplateExcel(params){
        try {
            const response = await DataService.getFile('Api/PlayerSegmentation/ExportMonitoredTemplateExcel', null, {params: params});
            if (response.status === 204) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'ThresholdMonitoringSetting.xls');
            }
        } catch (e) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            console.log(e)
        }
    
    }

    static async getMonitoredPlayerReachedHistory(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/GetMonitoredPlayerReachedHistory', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse;
    }

    static async exportMonitoredPlayerReachedHistory(params) {
        try {
            const response = await DataService.getFile('Api/PlayerSegmentation/ExportMonitoredPlayerReachedHistory', params);
            if (response.status === 204) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'NotificationHistory.xls');
            }
        } catch (e) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            console.log(e)
        }
    }

    static async insertMonitoredPlayer(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/InsertMonitoredPlayer', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse
    }

    static async batchUpdateMonitoredPlayer(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/BatchUpdateMonitoredPlayer', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse
    }

    static async updateMonitoredPlayer(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/UpdateMonitoredPlayer', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse
    }


    static async removeMonitoredPlayer(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/DeleteMonitoredPlayer', params);
            if(response.status === 200) {
                return { 
                    ...successResponse,
                    ...{ data: response.data }
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return errorResponse
    }
}
