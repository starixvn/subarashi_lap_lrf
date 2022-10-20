import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site';
import { errorResponse, successResponse } from '../../../lib/constants';

export default class VipPlayerQueryService {
    static async getPlayerList(params) {
        try {
            const response = await DataService.postData('Api/PlayerSegmentation/GetVipPlayerList', params);
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
    static async downloadVipPlayerListTemplateExcel(params){
        try {
            const response = await DataService.getFile('Api/PlayerSegmentation/ExportVipPlayerListTemplateExcel', null, {params: params});
            if (response.status === 204) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'VipPlayerList.xls');
            }
        } catch (e) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            console.log(e)
        }
    
    }
}