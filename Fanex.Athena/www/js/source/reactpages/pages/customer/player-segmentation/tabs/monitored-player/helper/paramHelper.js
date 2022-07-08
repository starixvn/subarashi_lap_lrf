import Site from '@jsroot/lib/site'

export default class ParamHelper {
    static ToAPIParams({ selectedParams, username, isGetAll, dateRange, selectedCurrency,
         selectedSubsidiary, subsidiarySearch, supportedReachedDateRange } ) {
        return {
            ...selectedParams,
            ...{
                username,
                isGetAll,
                fromDate: isGetAll ? supportedReachedDateRange.fromDate : Site.convertDateToString(dateRange.fromDate),
                toDate: isGetAll ? supportedReachedDateRange.toDate : Site.convertDateToString(dateRange.toDate),
                currencyIdList: selectedCurrency,
                subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
                subsidiarySearch
            }
        }
    }
}