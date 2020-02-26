import DataService from '@jsroot/lib/DataService';

export default class VipPlayerQueryService {
    static async getPlayerList(params) {
        const response = await DataService.postData('Api/PlayerSegmentation/GetVipPlayerList', params);
        if(response.status === 200) {
            return response.data;
        } else {
            alert('error')
        }
    }
}