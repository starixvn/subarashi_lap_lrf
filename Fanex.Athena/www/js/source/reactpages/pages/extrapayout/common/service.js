import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import Report from '@jsroot/lib/report'

export default class Service {
    static getTitle(fromDate, toDate, currency, baseCurrency, ProductCodeList, username) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';

        var currencyName = baseCurrency === '' ? currency : baseCurrency;
        const baseCurrencyText = ` - ${LangHelper.getSingleResource("Viewin").replace("{0}", currencyName)}`;
        const productText = ` (${ProductCodeList.replaceAll(",", ", ")})`;
        var userNameText = username === '' ? LangHelper.getSingleResource('LicenseeW_L') : `${username},`;  

        return LangHelper.getSingleResource("ExtraPayout") + dateRangeText + baseCurrencyText + ', ' + userNameText + productText;
    }

    static getDetailTitle(fromDate, toDate, currency, baseCurrency, nickname, username) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';

        var currencyName = baseCurrency === '' ? currency : baseCurrency;
        const baseCurrencyText = ` - ${LangHelper.getSingleResource("Viewin").replace("{0}", currencyName)}`;
        var userNameText = username === '' ? '' : `${nickname}(${username}) `;  

        return LangHelper.getSingleResource("PromotionDetails") + dateRangeText + '- ' + userNameText + baseCurrencyText;
    }

    static getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
        return Report.getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate)
    }
}