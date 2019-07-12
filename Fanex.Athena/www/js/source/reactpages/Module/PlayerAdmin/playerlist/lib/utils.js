export const buildSelectedPlayer = (dataItem) => {
    return {
        custId: dataItem.CustId,
        userName: dataItem.UserName,
        currency: dataItem.Currency
    };
}

export const getSpecialLevelText = (value) => {
    return Number(value) === 0 ? 'None' : value;
}