import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import Report from '@jsroot/lib/report'
import { ViewInText, ViewInLevel } from './constants';

export default class Service {
    static getTitle(fromDate, toDate, viewInLevel ,currency, baseCurrency, userName) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';
        const viewInText = LangHelper.getSingleResource("Viewin").replace("{0}", ViewInText[viewInLevel])

        let result = LangHelper.getSingleResource("AbnormalBet") + ", " + viewInText + dateRangeText;

        if (viewInLevel === ViewInLevel.DETAIL) {
            const currencyText = currency ? `, ${LangHelper.getSingleResource("Currency")}: ${currency}` : "";
            const baseCurrencyText = baseCurrency ? `, ${LangHelper.getSingleResource("BaseCurrency")}: ${baseCurrency}` : "";
            const userText = userName  ? `, ${LangHelper.getSingleResource("Username")}: ${userName}` : "";

            result = result + currencyText + baseCurrencyText + userText;
        }

        return result;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }
}