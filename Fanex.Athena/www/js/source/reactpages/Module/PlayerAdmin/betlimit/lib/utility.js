import LangHelper from '@jsroot/lib/langHelper';
import NumberFormat from '@jsroot/lib/numberFormat';
import { BetLimitProduct } from './constants';

const ConfirmationMsg = {
    [BetLimitProduct.SB]: 'UpdateSportsbookBetSettings',
    [BetLimitProduct.VS]: 'UpdateProductBetSettings',
    [BetLimitProduct.VS2]: 'UpdateProductBetSettings',
    [BetLimitProduct.LT]: 'UpdateProductBetSettings',
    [BetLimitProduct.NG]: 'UpdateNumberGameBetSettings',
    [BetLimitProduct.KN]: 'UpdateProductBetSettings',
    [BetLimitProduct.AGC]: 'UpdateAgCasinoBetSettings'
}

export default class Utility {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getConfirmationMsg(productId) {

        return LangHelper.getSingleResource(ConfirmationMsg[productId]);
    }

    static formatValue(number) {
        return NumberFormat.parseToString(number);
    }

    static getValueAsNumber(text) {
        const number = parseFloat(text.replace(/,/g, ''));

        return !isNaN(number) && isFinite(number) ? NumberFormat.round(number, 2) : NaN;
    }
}