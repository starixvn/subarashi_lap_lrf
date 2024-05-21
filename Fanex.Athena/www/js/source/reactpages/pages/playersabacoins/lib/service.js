import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
export default class Service {
    static getTitle(fromDate, toDate) {
        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';

        return LangHelper.getSingleResource("PlayerSabaCoins") + dateRangeText;
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
}