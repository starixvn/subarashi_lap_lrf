import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper'
import { Url } from './constants';


export const GetData = async params => {
    try {
        var response = await DataService.postData(Url.getOddsGroupLicenseeSettingLog, params);
        if(response.status === 200) {
            return response.data;
        }
    }
    catch(e) {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
        console.log(e)
    }

    return null;
}