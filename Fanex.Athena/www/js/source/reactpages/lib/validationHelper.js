
export const validateBaseCurrency=(baseCurrency = "")=> {
    return baseCurrency &&
        window._AppData.baseCurrencyList.find(x => x.value === baseCurrency);
}