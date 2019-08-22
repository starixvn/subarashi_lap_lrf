import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import { BetLimitProduct } from './constants';

const Url = {
    [BetLimitProduct.SB]: 'SportBookBetLimit'
};

export default class Service {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getConfirmationMsg(productId) {
        return LangHelper.getSingleResource('UpdateSportsbookBetSettings');
    }

    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Url[param.ProductId] + '/GetSetting';
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

    static updateData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Url[param.ProductId] + '/UpdateSetting';
        DataService.postData(url, param)
            .then(response => {
                const result = response.data;
                const isSuccess = Number(result.Code) === 0;
                const title = isSuccess
                    ? LangHelper.getSingleResource('MessageSuccess')
                    : LangHelper.getSingleResource('Fail');

                processDataFunc && processDataFunc(title, result.Message, isSuccess);
                successCallBack && successCallBack();
            })
            .catch(error => {
                errorHandle && errorHandle();
            });
    }
}