import Site from '@jsroot/lib/site'

export default class ParamHelper {
    static ConvertToFriendlyParams({ selectedParams, username, selectedCurrency, isGetAll, dateRange }) {
        return {
            ...selectedParams, 
            ...{
                username,
                currencyIdList: selectedCurrency,
                isGetAll,
                fromDate: Site.convertDateToString(dateRange.fromDate),
                toDate: Site.convertDateToString(dateRange.toDate)
            }
        }
    }
}