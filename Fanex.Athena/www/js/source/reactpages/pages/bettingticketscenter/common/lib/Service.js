import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import { HeaderText } from './constants';
import AppData from '@jsroot/lib/AppData';
import moment from 'moment'

export default class Service {
    static getTitle(fromDate, toDate, baseCurrency, viewSabaCoins = false) {
        if(viewSabaCoins) {
            return `${LangHelper.getSingleResource("BettingTicketCenter")}, ${LangHelper.getSingleResource("Viewin").replace("{0}", LangHelper.getSingleResource("SabaCoins"))}`;
        }

        const dateRangeText = fromDate && toDate 
            ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` 
            : '';

        const baseCurrencyText = baseCurrency ? `, ${LangHelper.getSingleResource("BaseCurrency")}: ${baseCurrency}` : '';

        return LangHelper.getSingleResource("BettingTicketCenter") + dateRangeText + baseCurrencyText;
    }

    static getHeaderName = (column) => {
        if (column === 'LicenseeWL') {
            return `${HeaderText.LicenseeWL}/${HeaderText.Comm}`;
        }

        if (column === 'WinLoss' && AppData.isAllowedCustomerComm) {
            return `${HeaderText.WinLoss}/${HeaderText.Comm}`;
        }

        if(column === "")
        {
            return "";
        }

        return HeaderText[column];
    }

    static isSingleDate = (dateRange) => {
        if (!dateRange)
        {
            return false;
        }
        const { fromDate, toDate } = dateRange;
        return moment(fromDate, "MM/DD/YYYY", true).isSame(moment(toDate, "MM/DD/YYYY", true), 'day');
    }
}