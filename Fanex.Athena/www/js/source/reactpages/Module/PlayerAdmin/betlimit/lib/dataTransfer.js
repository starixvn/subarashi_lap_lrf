import LangHelper from '@jsroot/lib/langHelper';
import DataService from '@jsroot/lib/DataService';
import Site from '@jsroot/lib/site';
import { BetLimitProduct } from './constants';

const Url = {
    [BetLimitProduct.SB]: 'SportsBookBetLimit',
    [BetLimitProduct.VS]: 'DcsBetLimit',
    [BetLimitProduct.VS2]: 'DcsBetLimit',
    [BetLimitProduct.LT]: 'DcsBetLimit',
    [BetLimitProduct.NG]: 'NumberGameBetLimit',
    [BetLimitProduct.KN]: 'RngKenoBetLimit',
    [BetLimitProduct.AGC]: 'AGCasinoBetLimit'
};

export default class DataTransfer {
    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(Url[param.ProductId] + '/GetSetting');
        DataService.postData(url, param)
            .then(response => {
                const { Data, ...setting } = response.data;

                processDataFunc && processDataFunc(Data, setting);

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
                const title = isSuccess ?
                    LangHelper.getSingleResource('MessageSuccess') :
                    LangHelper.getSingleResource('Fail');

                processDataFunc && processDataFunc(title, result.Message, isSuccess);
                successCallBack && successCallBack();
            })
            .catch(error => {
                errorHandle && errorHandle();
            });
    }
}