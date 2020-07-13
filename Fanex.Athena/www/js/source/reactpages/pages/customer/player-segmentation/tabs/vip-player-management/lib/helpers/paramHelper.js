export default class ParamHelper {
    static ToAPIParams({ selectedParams, username, selectedCurrency, selectedVipOption, selectedSubsidiary } ) {
        return {
            ...selectedParams,
            ...{
                username,
                currencyIdList: selectedCurrency,
                vipOption: selectedVipOption,
                subsidiaryList: selectedSubsidiary
            }
        }
    }
}