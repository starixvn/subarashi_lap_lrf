import { shallowEqual, useSelector } from "react-redux";
import { validateBaseCurrency } from "@jsroot/lib/validationHelper";
import useSubsidiarySearch from "@jsroot/customHooks/useSubsidiarySearch";

export const useValidParam = () => {
    const {
        selectedProduct,
        selectedStatus,
        selectedBaseCurrency,
        selectedPlatform,
        selectedLiveStatus,
        selectedCurrency,
        selectedCustomerClass,
        selectedOddsGroup,
        selectedSubsidiary,
        bettypeList,
        selectedBettype,
    } = useSelector((state) => state, shallowEqual);
    const { isSubsidiarySearch } = useSubsidiarySearch();

    return (
        !!selectedProduct &&
        !!selectedStatus &&
        !!selectedLiveStatus &&
        !!selectedCurrency &&
        !!selectedCustomerClass &&
        !!selectedOddsGroup &&
        !!selectedPlatform &&
        validateBaseCurrency(selectedBaseCurrency) &&
        (!isSubsidiarySearch || !!selectedSubsidiary) &&
        bettypeList.some((betType) => betType.value === selectedBettype)
    );
};
