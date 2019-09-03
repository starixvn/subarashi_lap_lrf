import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import NumberFormat from '@jsroot/lib/numberFormat';
import Validatation from './validatation';
import { BetLimitProduct, BetLimitType } from './constants';
import Utility from './utility';

const Url = {
    [BetLimitProduct.SB]: 'SportBookBetLimit',
    [BetLimitProduct.VS]: 'DcsBetLimit',
    [BetLimitProduct.VS2]: 'DcsBetLimit',
    [BetLimitProduct.LT]: 'DcsBetLimit',
    [BetLimitProduct.NG]: 'NumberGameBetLimit',
    [BetLimitProduct.KN]: 'RngKenoBetLimit'
};

export default class Service {
    static getViewData(rawData) {
        return rawData.map((rawRow) => {
            let data = {
                Id: rawRow.Id,
                BetType: rawRow.BetType,
                BetSettingType: rawRow.BetSettingType,
                MinBet: Utility.formatValue(rawRow.MinBet),
                MaxBet: Utility.formatValue(rawRow.MaxBet),
                MaxPerMatch: Utility.formatValue(rawRow.MaxPerMatch),
                MaxPerBall: Utility.formatValue(rawRow.MaxPerBall),
                BetValueMin: rawRow.BetValueMin,
                BetValueMax: rawRow.BetValueMax,
                MaxPerMatchMin: rawRow.MaxPerMatchMin,
                MaxPerMatchMax: rawRow.MaxPerMatchMax,
                MaxPerBallMax: rawRow.MaxPerBallMax
            };

            data.OriginalMinBet = data.MinBet;
            data.OriginalMaxBet = data.MaxBet;
            data.OriginalMaxPerMatch = data.MaxPerMatch;
            data.OriginalMaxPerBall = data.MaxPerBall;

            return data;
        });
    }

    static getSubmitRowData(row) {
        return {
            Id: row.Id,
            BetType: row.BetType,
            BetSettingType: row.BetSettingType,
            MinBet: Utility.getValueAsNumber(row.MinBet),
            MaxBet: Utility.getValueAsNumber(row.MaxBet),
            MaxPerMatch: Utility.getValueAsNumber(row.MaxPerMatch),
            MaxPerBall: Utility.getValueAsNumber(row.MaxPerBall),
            IsUpdated: row.MinBet !== row.OriginalMinBet
                || row.MaxBet !== row.OriginalMaxBet
                || row.MaxPerMatch !== row.OriginalMaxPerMatch
                || row.MaxPerBall !== row.OriginalMaxPerBall
        };
    }

    static getSubmitData(data) {
        const submitData = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const currentValue = Service.getSubmitRowData(row);
            const invalidData = Validatation.validate(currentValue, row);

            if (invalidData !== null) {
                return {
                    IsValid: false,
                    Data: invalidData
                };
            }

            submitData.push(currentValue);
        }

        return {
            IsValid: true,
            Data: submitData
        };
    }

    static validate(row) {
        const currentValue = Service.getSubmitRowData(row);

        return Validatation.validate(currentValue, row);
    }

    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(Url[param.ProductId] + '/GetSetting');
        DataService.postData(url, param)
            .then(response => {
                const { Data, ...setting } = response.data;

                if (Data && Data.length > 0) {
                    processDataFunc && processDataFunc(Service.getViewData(Data), setting);
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