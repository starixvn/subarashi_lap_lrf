import LangHelper from '@jsroot/lib/langHelper';
import NumberFormat from '@jsroot/lib/numberFormat';
import { BetLimitProduct } from './constants';

export default class Utility {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getConfirmationMsg(productId) {
        return LangHelper.getSingleResource('UpdateSportsbookBetSettings');
    }

    static formatValue(number) {
        return NumberFormat.parseToString(number);
    }

    static getValueAsNumber(text) {
        const number = parseFloat(text.replace(/,/g, ''));

        return !isNaN(number) && isFinite(number) ? NumberFormat.round(number, 2) : NaN;
    }
}