import DataService from '@jsroot/lib/DataService';

export default class ProblemPlayerQueryService {
    static async getPlayerList(params) {
        const response = await DataService.postData('Api/PlayerSegmentation/GetProblemPlayerList', params);
        if(response.status === 200) {
            return response.data;
        } else {
            alert('error')
        }
    }
}
