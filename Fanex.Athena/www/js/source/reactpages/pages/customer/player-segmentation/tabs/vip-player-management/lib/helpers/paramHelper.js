export default class ParamHelper {
    static ConvertToFriendlyParams({ selectedParams, username, selectedCurrency, selectedVipOption } ) {
        return {
            ...selectedParams,
            ...{
                username,
                currencyIdList: selectedCurrency,
                vipOption: selectedVipOption
            }
        }
    }
}