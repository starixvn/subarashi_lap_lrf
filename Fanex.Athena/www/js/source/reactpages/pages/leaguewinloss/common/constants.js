import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

export const DefaultPageSize = 50;

export const ApiUrl = {
    CUSTOMER_SEARCH_URL: Site.resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
    REPORT_DATA_URL: "Api/LeagueWinLoss/GetMainData",
    EXPORT_REPORT_DATA_URL: "Api/LeagueWinLoss/ExportExcel",
    REPORT_CURRENCY_DATA_URL: "Api/LeagueWinLoss/GetCurrencyData"
}

export const headerText = {
    league: LangHelper.getSingleResource('League'),
    betcount: LangHelper.getSingleResource('BetCount'),
    turnover: LangHelper.getSingleResource('Turnover'),
    customerWL: LangHelper.getSingleResource('CustomerW_L'),
    licenseeWL: LangHelper.getSingleResource('LicenseeW_L'),
    BACommission: LangHelper.getSingleResource('BACommission'),
    match: LangHelper.getSingleResource('Match'),
    bettype: LangHelper.getSingleResource('Bettype'),
}

export const BreadcrumbText = {
    main: LangHelper.getSingleResource('League '),
    match: LangHelper.getSingleResource('Match'),
    bettype: LangHelper.getSingleResource('Bettype')
}

export const ReportLevel = {
    MAIN: 0,
    MATCH: 1,
    BETTYPE: 2
}