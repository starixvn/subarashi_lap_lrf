import AppData from './AppData';

const emailPattern = '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$';

export const validateBaseCurrency = (baseCurrency = "", allowEmpty = true)=> {
    return (allowEmpty && !baseCurrency) || (!!baseCurrency && AppData.baseCurrencyList.find(x => x.value === baseCurrency));
}

export const validateEmail = email => email && (new RegExp(emailPattern).test(email))

