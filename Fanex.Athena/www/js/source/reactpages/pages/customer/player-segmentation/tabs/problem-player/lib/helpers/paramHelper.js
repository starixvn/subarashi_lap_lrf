import Site from '@jsroot/lib/site'

export default class ParamHelper {
    static ToAPIParams({ selectedParams, username, selectedCurrency, selectedBaseCurrency, isGetAll, dateRange, selectedReason }) {
        return {
            ...selectedParams, 
            ...{
                username,
                currencyIdList: selectedCurrency,
                baseCurrency: selectedBaseCurrency,
                reasonIdList: selectedReason,
                isGetAll,
                fromDate: Site.convertDateToString(dateRange.fromDate),
                toDate: Site.convertDateToString(dateRange.toDate)
            }
        }
    }
}