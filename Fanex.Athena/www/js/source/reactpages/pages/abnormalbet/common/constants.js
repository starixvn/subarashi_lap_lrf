import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

export const DefaultPageSize = 50;

export const ApiUrl = {
    CUSTOMER_SEARCH_URL: Site.resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
    REPORT_DATA_URL: "Api/AbnormalBet/GetData",
    EXPORT_REPORT_DATA_URL: ["Api/AbnormalBet/ExportSummaryExcel","Api/AbnormalBet/ExportIpSummaryExcel","Api/AbnormalBet/ExportDetailExcel"],
    EXPORT_REPORT_TITLE: ["AbnormalBet","AbnormalBet","AbnormalBet"]
}

export const headerText = {
    date: LangHelper.getSingleResource('Date'),
    externalID: LangHelper.getSingleResource('ExternalId'),
    systemID: LangHelper.getSingleResource('SystemId'),
    currency: LangHelper.getSingleResource('Currency'),
    refNo: LangHelper.getSingleResource('RefNo'),
    odds: LangHelper.getSingleResource('Odds'),
    stake: LangHelper.getSingleResource('Stake'),
    HDP: LangHelper.getSingleResource('HDP'),
    score: LangHelper.getSingleResource('Score'),
    sport: LangHelper.getSingleResource('Sport'),
    betType: LangHelper.getSingleResource('BetType'),
    choice: LangHelper.getSingleResource('Choice'),
    transTime: LangHelper.getSingleResource('TransTime'),
    league: LangHelper.getSingleResource('League'),
    match: LangHelper.getSingleResource('Match'),
    KOTime: LangHelper.getSingleResource('KOTime'),
    live: LangHelper.getSingleResource('Live'),
    finalScore: LangHelper.getSingleResource('FinalScore'),
    IP: LangHelper.getSingleResource('IP'),
    location: LangHelper.getSingleResource('Location'),
    reason: LangHelper.getSingleResource('Reason'),
    totalTransaction: LangHelper.getSingleResource('TotalTransaction'),
    lastLogin: LangHelper.getSingleResource('LastLogin'),
    ticket: LangHelper.getSingleResource('Ticket')
}

export const ViewInLevel = {
    SUMMARY: 0,
    IPSUMMARY: 1,
    DETAIL: 2
}

export const ViewInText = [LangHelper.getSingleResource('Summary'),LangHelper.getSingleResource('IpSummary'),LangHelper.getSingleResource('Detail')]