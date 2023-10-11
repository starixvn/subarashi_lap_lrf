import { useRef } from "react";
import { useSelector, useStore } from "react-redux";
import AppData from '@jsroot/lib/AppData';
import { useIsFirstRender } from "usehooks-ts";

export const useBaseCurrencyForMultiSelectCurrency = (initSelectedBaseCurrency) => {
    const [originalBaseCurrencyList, originalCurrencyList] = [AppData.baseCurrencyList, AppData.currencyList];
    const defaultBaseCurrencyRef = useRef(initSelectedBaseCurrency);
    const isFirstRender = useIsFirstRender();
    const baseCurrecyListRef = useRef(originalBaseCurrencyList);
    const selectedCurrency = useSelector(state => state.selectedCurrency);
    const store = useStore();
    const selectedBaseCurrency = store.getState().selectedBaseCurrency; //use react store to get state value so that component will not trigger re-render when selectedBaseCurrency change

    if (isFirstRender && !initSelectedBaseCurrency){
        defaultBaseCurrencyRef.current = selectedBaseCurrency;
    }

    const baseCurrencyList = baseCurrecyListRef.current;
    const defaultBaseCurrency = defaultBaseCurrencyRef.current;

    let newBaseCurrency = '';
    let newBaseCurrencyList = baseCurrencyList;
    const _isSingleSelectedCurrency = () => selectedCurrency && selectedCurrency.indexOf(',') < 0

    if (_isSingleSelectedCurrency()) {
        const currencyName = originalCurrencyList.find(x => x.Id == selectedCurrency).Value;
        if (!baseCurrencyList.find(x => x.label === currencyName)) {
            newBaseCurrency = '';
            newBaseCurrencyList = originalBaseCurrencyList.slice(0);
            newBaseCurrencyList.push({ value: newBaseCurrency, label: currencyName });
        }
        else {
            newBaseCurrency = selectedBaseCurrency;
            newBaseCurrencyList = baseCurrencyList;
        }
    }
    else {
        newBaseCurrencyList = originalBaseCurrencyList;
        newBaseCurrency = newBaseCurrencyList.find(x => x.label === selectedBaseCurrency) ?
            selectedBaseCurrency :
            defaultBaseCurrency;
    }

    baseCurrecyListRef.current = newBaseCurrencyList;
    return { baseCurrencyList: newBaseCurrencyList, selectedBaseCurrency: newBaseCurrency };
}

export default useBaseCurrencyForMultiSelectCurrency;