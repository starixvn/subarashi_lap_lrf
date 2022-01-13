import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

export const DefaultPageSize = 50;

export const ApiUrl = {
    REPORT_DATA_URL: Site.resolveClientUrl("ExtraPayoutReport/Index"),
    REPORT_DETAIL_DATA_URL: Site.resolveClientUrl("ExtraPayoutReport/Detail")
}

export const headerText = {
    date: LangHelper.getSingleResource('Date'),
    refno: LangHelper.getSingleResource('RefNo'),
    externalId: LangHelper.getSingleResource('ExternalId'),
    systemId: LangHelper.getSingleResource('SystemId'),
    currency: LangHelper.getSingleResource('Currency'),
    product: LangHelper.getSingleResource('Product'),
    promotionType: LangHelper.getSingleResource('PromotionType'),
    turnover: LangHelper.getSingleResource('Turnover'),
    totalTransaction: LangHelper.getSingleResource('TotalTransaction'),
    customerAmount: LangHelper.getSingleResource('CustomerAmount'),
    licSharingAmount: LangHelper.getSingleResource('LicSharingAmount')
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