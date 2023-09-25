import LangHelper from '../../../lib/langHelper'
import Site from '../../../lib/site'
import Report from '../../../lib/report'

export const HeaderText = {
    index: LangHelper.getSingleResource('#'),
    date: LangHelper.getSingleResource('Date'),
    month: LangHelper.getSingleResource('Month'),
    externalId: LangHelper.getSingleResource('ExternalId'),
    systemId: LangHelper.getSingleResource('SystemId'),
    currency: LangHelper.getSingleResource('Currency'),
    turnover: LangHelper.getSingleResource('Turnover'),
    netTurnover: LangHelper.getSingleResource('NetTurnover'),
    totalTransaction: LangHelper.getSingleResource('TotalTransaction'),
    player: LangHelper.getSingleResource('Player'),
    playerWL: LangHelper.getSingleResource('PlayerWL'),
    playerComm: LangHelper.getSingleResource('PlayerComm'),
    total: LangHelper.getSingleResource('Total'),
    licensee: LangHelper.getSingleResource('Licensee'),
    licenseeWL: LangHelper.getSingleResource('LicenseeW_L'),
    amountDueTo: LangHelper.getSingleResource('AmountDueTo'),
    licenseeComm: LangHelper.getSingleResource('LicenseeComm'),
}

export const TotalText = {
    total: LangHelper.getSingleResource('Total'),
    totalIn: LangHelper.getSingleResource('Totalin')
}

export const BreadcrumbText = {
    main: LangHelper.getSingleResource('Main'),
    licensee: LangHelper.getSingleResource('Licensee'),
    player: LangHelper.getSingleResource('Player')
}

export const ViewInType ={
    SettledAndResettledReport: 2,
    SettledOnly: 1
}

export class Service {
    static getReportTitle(dateRange, selectedCurrency, allCurrencies, username, selectedViewInType, isViewResettledTicketOnly) {
        const fromDate = Site.convertDateToString(dateRange.fromDate);
        const toDate = Site.convertDateToString(dateRange.toDate);
        const viewInByCurrency = allCurrencies 
            ? LangHelper.getSingleResource('AllCurrencies') 
            : `${LangHelper.getSingleResource('Viewin').replace('{0}', selectedCurrency)}`;
        const usernameText = !username ? "" : `, ${LangHelper.getSingleResource('Username')}: ${username}`;

        let viewInTypeText = selectedViewInType === ViewInType.SettledOnly 
            ? LangHelper.getSingleResource("SettledOnlyReport") 
            : LangHelper.getSingleResource("SettledAndResettledReport");

        viewInTypeText = isViewResettledTicketOnly ? LangHelper.getSingleResource("ResettledReport") : viewInTypeText;

        return `${LangHelper.getSingleResource('ExchangeWinLoss')} - ${viewInTypeText}, ${fromDate} - ${toDate}, ${viewInByCurrency}${usernameText}`;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
        return Report.getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate)
    }
}