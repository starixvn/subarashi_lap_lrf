export default class ParamHelper {
    static ToAPIParams({ selectedParams, username, selectedCurrency, selectedVipOption, selectedSubsidiary, subsidiarySearch, selectedCustomerClass, pagingOption} ) {
        return {
            ...selectedParams,
            ...{
                username,
                currencyIdList: selectedCurrency,
                vipOption: selectedVipOption,
                subsidiaryList: subsidiarySearch ? selectedSubsidiary : '',
                subsidiarySearch,
                customerClass: selectedCustomerClass,
                orderCol: pagingOption.orderCol,
                sortType: pagingOption.sortType
            }
        }
    }
}
