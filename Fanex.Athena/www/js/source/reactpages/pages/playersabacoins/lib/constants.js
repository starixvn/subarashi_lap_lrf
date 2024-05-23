import Site from '@jsroot/lib/site';

export const ApiUrl = {
    REPORT_DATA_URL: "Api/PlayerSabaCoins/GetData",
    EXPORT_REPORT_DATA_URL: "Api/PlayerSabaCoins/ExportExcel",
    CUSTOMER_SEARCH_URL: Site.resolveClientUrl("SearchCustomerAPI/SearchCustomer")
}

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 50,
    TotalItem: 0,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
}