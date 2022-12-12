import Site from '@jsroot/lib/site'

export default class ParamHelper {
    static ToAPIParams({selectedParams, username, selectedCurrency, selectedBaseCurrency, isGetAll, dateRange, selectedSubsidiary, subsidiarySearch}, sort, selectedSport, selectedLevel) {
        return {
            ...selectedParams,
            ...sort,
            ...{
                username,
                currencyIdList: selectedCurrency,
                baseCurrency: selectedBaseCurrency,
                isGetAll,
                fromDate: Site.convertDateToString(dateRange.fromDate),
                toDate: Site.convertDateToString(dateRange.toDate),
                subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
                subsidiarySearch,
                sportIdList: selectedSport,
                levelIdList: selectedLevel,
                orderCol: 2,
                sortType: 1,
            }
        }
    }
}
