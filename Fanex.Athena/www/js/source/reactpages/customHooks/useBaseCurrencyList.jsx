import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppData from '@jsroot/lib/AppData';
import {setSelectedBaseCurrency} from '../actions/baseCurrencyAction'
import { useIsFirstRender } from "usehooks-ts";

export const useBaseCurrencyList = (initDefaultBaseCurrency) => {
    const [ originalBaseCurrencyList, originalCurrencyList ] = [AppData.baseCurrencyList, AppData.currencyList];
    const isFirstRender = useIsFirstRender();
    const dispatch = useDispatch();
    const [baseCurrencyList, setBaseCurrencyList] = useState(originalBaseCurrencyList)
    const defaultBaseCurrencyRef = useRef(initDefaultBaseCurrency);
    const selectedCurrency = useSelector(state => state.selectedCurrency);
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);

    if (isFirstRender && !initDefaultBaseCurrency)
    {
        defaultBaseCurrencyRef.current = selectedBaseCurrency;
    }

    const defaultBaseCurrency = defaultBaseCurrencyRef.current;
    let newBaseCurrency = '';
    let newBaseCurrencyList = originalBaseCurrencyList;

    const _isSingleSelectedCurrency = () => selectedCurrency && selectedCurrency.indexOf(',') < 0

    if (_isSingleSelectedCurrency()){
        const currencyName = originalCurrencyList.find(x => x.Id == selectedCurrency).Value;
        if (!baseCurrencyList.find(x => x.label === currencyName)) 
        {
            newBaseCurrency = '';
            newBaseCurrencyList = originalBaseCurrencyList.slice(0);
            newBaseCurrencyList.push({ value: newBaseCurrency, label: currencyName });
        }
        else {
            newBaseCurrency = currencyName;
        }
    }
    else{
        newBaseCurrencyList = originalBaseCurrencyList;
        newBaseCurrency = newBaseCurrencyList.find(x => x.label === selectedBaseCurrency) ?
            selectedBaseCurrency :
            defaultBaseCurrency;
    }

    dispatch(setSelectedBaseCurrency(newBaseCurrency));
    setBaseCurrencyList[newBaseCurrencyList]
    return newBaseCurrencyList;
}

export default useBaseCurrencyList;