import LangHelper from '@jsroot/lib/langHelper';

export const DefaultPageSize = 50;

export const ApiUrl = {
    REPORT_DATA_URL: "Api/NewCashOutWinLoss/GetData",
    EXPORT_REPORT_DATA_URL: "Api/NewCashOutWinLoss/ExportExcel"
}

export const headerText = {
    date: LangHelper.getSingleResource('Date'),
    externalId: LangHelper.getSingleResource('ExternalId'),
    systemId: LangHelper.getSingleResource('SystemId'),
    currency: LangHelper.getSingleResource('Currency'),
    turnover: LangHelper.getSingleResource('Turnover'),
    totalTransaction: LangHelper.getSingleResource('TotalTransaction'),
    customerWL: LangHelper.getSingleResource('CustomerW_L'),
    winLoss: LangHelper.getSingleResource('WinLoss'),
    comm: LangHelper.getSingleResource('Comm'),
    total: LangHelper.getSingleResource('Total'),
    licenseeWL: LangHelper.getSingleResource('LicenseeW_L'),
    BACommission: LangHelper.getSingleResource('BACommission'),
    amtDueToBA: LangHelper.getSingleResource('AmtDueToBA')
}


export const BreadcrumbText = {
    main: LangHelper.getSingleResource('Main'),
    customer: LangHelper.getSingleResource('Customer')
}

export const ReportLevel = {
    MAIN: 0,
    CUSTOMER: 1
}

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 50,
    TotalItem: 0,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
}