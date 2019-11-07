import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';

export const ApiUrl = {
    CUSTOMER_SEARCH_URL: Site.resolveClientUrl("SearchCustomerAPI/SearchCustomer"),
    RUNNING_DATA_URL: Site.resolveClientUrl('api/BettingTicketCenter/GetByRunning'),
    REFNO_DATA_URL: Site.resolveClientUrl('api/BettingTicketCenter/GetByRefNo'),
    SINGLECUSTOMER_DATA_URL: Site.resolveClientUrl('api/BettingTicketCenter/GetBySingleCustomer'),
    MULTICUSTOMER_DATA_URL: Site.resolveClientUrl('api/BettingTicketCenterMultiCustomer/GetData')
}

export const HeaderText = {
    Index: "#",
    Platform: LangHelper.getSingleResource("Platform"),
    ExternalId: LangHelper.getSingleResource("ExternalId"),
    SystemId: LangHelper.getSingleResource("SystemId"),
    RefNo: LangHelper.getSingleResource("RefNo"),
    TransTime: LangHelper.getSingleResource("TransTime"),
    Choice: LangHelper.getSingleResource("Choice"),
    Odds: LangHelper.getSingleResource("Odds"),
    OddsType: LangHelper.getSingleResource("OddsType"),
    Stake: LangHelper.getSingleResource("Stake"),
    WinLoss: LangHelper.getSingleResource("WinLoss"),
    LicenseeWL: LangHelper.getSingleResource("LicenseeWL"),
    Comm: LangHelper.getSingleResource("Comm"),
    Status: LangHelper.getSingleResource("Status"),
    Live: LangHelper.getSingleResource("Live")
}

export const DefaultPageSize = 50;