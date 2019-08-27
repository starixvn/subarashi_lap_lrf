import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import NumberFormat from '@jsroot/lib/numberFormat';
import { BetLimitProduct, BetLimitType } from './constants';

const Url = {
    [BetLimitProduct.SB]: 'SportBookBetLimit',
    [BetLimitProduct.VS]: 'DcsBetLimit',
    [BetLimitProduct.VS2]: 'DcsBetLimit',
    [BetLimitProduct.LT]: 'DcsBetLimit',
    [BetLimitProduct.NG]: 'NumberGameBetLimit'
};

export default class Service {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getConfirmationMsg(productId) {
        return LangHelper.getSingleResource('UpdateSportsbookBetSettings');
    }

    static formatValue(value) {
        return NumberFormat.format(value, 2, false);
    }

    static getValueAsNumber(text) {
        const number = parseFloat(text.replace(/,/g, ''));

        return !isNaN(number) && isFinite(number) ? number : NaN;
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

    static validate(current, original) {
        const { MinBet, MaxBet, MaxPerMatch } = current;

        if (isNaN(MinBet)) {
            return {
                type: BetLimitType.MinBet,
                msg: LangHelper.getSingleResource('IncorrectMinBet')
            };
        }
        if (isNaN(MaxBet)) {
            return {
                type: BetLimitType.MaxBet,
                msg: LangHelper.getSingleResource('IncorrectMaxBet')
            };
        }
        if (isNaN(MaxPerMatch)) {
            return {
                type: BetLimitType.MaxPerMatch,
                msg: LangHelper.getSingleResource('IncorrectMaxPerMatch')
            };
        }

        if (original.BetValueMin > 0 && MinBet < original.BetValueMin) {
            return {
                type: BetLimitType.MinBet,
                msg: LangHelper.getSingleResource('MinBetGreaterThanOrEqual') + ' ' + original.BetValueMin
            };
        }

        if (original.BetValueMax > 0 && MaxBet > original.BetValueMax) {
            return {
                type: BetLimitType.MaxBet,
                msg: LangHelper.getSingleResource('MaxBetLessThanOrEqual') + ' ' + original.BetValueMax
            };
        }

        if (original.MaxPerMatchMax > 0 && MaxPerMatch > original.MaxPerMatchMax) {
            return {
                type: BetLimitType.MaxPerMatch,
                msg: LangHelper.getSingleResource('MaxBetMatchMoreThanOrEqual') + ' ' + original.MaxPerMatchMax
            };
        }

        if (original.MaxPerMatchMin > 0 && MaxPerMatch < original.MaxPerMatchMin) {
            return {
                type: BetLimitType.MaxPerMatch,
                msg: LangHelper.getSingleResource('MaxBetMatchLessThanOrEqual') + ' ' + original.MaxPerMatchMin
            };
        }

        if (MinBet > MaxBet) {
            return {
                type: BetLimitType.MinBet,
                msg: LangHelper.getSingleResource('MinBetCanNotGreaterThanMaxBet') + ' ' + MaxBet
            };
        }

        if (MaxBet > MaxPerMatch) {
            return {
                type: BetLimitType.MaxBet,
                msg: LangHelper.getSingleResource('MaxBetCanNotGreaterThanMaxPerMatch') + ' ' + MaxPerMatch
            };
        }
    }

    static validateNumberGame(current, original) {
        const result = Service.validate(current, original);

        if (result) {
            return result;
        }

        const { MaxPerBall } = current;

        if (isNaN(MaxPerBall)) {
            return {
                type: BetLimitType.MaxPerBall,
                msg: LangHelper.getSingleResource('IncorrectMaxPerBall')
            };
        }

        if (original.MaxPerBallMax > 0 && MaxPerBall > original.MaxPerBallMax) {
            return {
                type: BetLimitType.MaxPerBall,
                msg: LangHelper.getSingleResource('MaxPerBallLessThanOrEqual') + ' ' + original.MaxPerBallMax
            };
        }
    }
}