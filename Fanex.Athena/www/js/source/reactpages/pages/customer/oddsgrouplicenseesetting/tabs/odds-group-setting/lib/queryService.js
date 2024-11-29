import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper'
import { Url } from './constants';
import { Code } from './constants';


export const GetDataList = async params => {
    try {
        var response = await DataService.postData(Url.getOddsGroupLicenseeSetting, params);
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

export const UpdateData = async params => {
    try {
        var response = await DataService.postData(Url.updateOddsGroupLicenseeSetting, params);        
        return response.data;
    }
    catch(e) {
        return {
            Code: Code.Error,
            Message: e
        }
    }
}