import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import NumberFormat from '@jsroot/lib/numberFormat';
import { BetLimitProduct } from './constants';

const Url = {
    [BetLimitProduct.SB]: 'SportBookBetLimit',
    [BetLimitProduct.VS]: 'DcsBetLimit',
    [BetLimitProduct.VS2]: 'DcsBetLimit',
    [BetLimitProduct.LT]: 'DcsBetLimit'
};

export default class Service {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getConfirmationMsg(productId) {
        return LangHelper.getSingleResource('UpdateSportsbookBetSettings');
    }

    static formatValue(value) {
        const data = NumberFormat.format(value, 2, false);

        return data ? data : "0";
    }

    static getValueAsNumber(text) {
        const number = parseFloat(text.replace(/,/g, ''));

        return !isNaN(number) && isFinite(number) ? number : 0;
    }

    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(Url[param.ProductId] + '/GetSetting');
        DataService.postData(url, param)
            .then(response => {
                const { Data, ...setting } = response.data;

                if (Data && Data.length > 0) {
                    processDataFunc && processDataFunc(Data, setting);
                }
                else {
                    processDataFunc && processDataFunc([], {});
                }

                successCallBack && successCallBack();
            })
            .catch(error => {
                processDataFunc && processDataFunc([], {});
                errorHandle && errorHandle();
            });
    }

    static updateData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(Url[param.ProductId] + '/UpdateSetting');
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