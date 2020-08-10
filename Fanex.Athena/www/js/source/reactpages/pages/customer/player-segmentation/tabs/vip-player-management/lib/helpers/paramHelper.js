export default class ParamHelper {
    static ToAPIParams({ selectedParams, username, selectedCurrency, selectedVipOption, selectedSubsidiary, subsidiarySearch } ) {
        return {
            ...selectedParams,
            ...{
                username,
                currencyIdList: selectedCurrency,
                vipOption: selectedVipOption,
                subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
                subsidiarySearch
            }
        }
    }
}