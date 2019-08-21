import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';

export default class Service {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getData(relativeUrl, param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(relativeUrl);
        DataService.postData(url, param)
            .then(response => {
                var result = response.data;

                var data = result.Data;
                if (data && data.length > 0) {
                    processDataFunc && processDataFunc(data, result.Editable);
                }
                else {
                    processDataFunc && processDataFunc([], false);
                }

                successCallBack && successCallBack();
            })
            .catch(error => {
                errorHandle && errorHandle();
            });
    }
}