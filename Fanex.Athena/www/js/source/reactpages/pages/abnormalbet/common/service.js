import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import Report from '@jsroot/lib/report'
import { ViewInText, ViewInLevel } from './constants';

export default class Service {
    static getTitle(fromDate, toDate, viewInLevel ,currency, baseCurrency, userName, isConvertAllToBaseCurrency) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';
        const viewInText = LangHelper.getSingleResource(ViewInText[viewInLevel])

        let result = LangHelper.getSingleResource("AbnormalBet") + ", " + viewInText + dateRangeText;

        if (viewInLevel === ViewInLevel.DETAIL) {
            var currencyName = baseCurrency === '' ? currency : baseCurrency;
            const baseCurrencyText = isConvertAllToBaseCurrency ? ', ' + LangHelper.getSingleResource("BaseCurrency") + ": " + currencyName:'';
            const currencyText = LangHelper.getSingleResource("Currency") + ": " + currency + baseCurrencyText 
            const userText = !userName ? "" : ', ' + LangHelper.getSingleResource("Username") + ": " + userName; 

            result = result + ", " + currencyText + userText;
        }

        return result;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }
}