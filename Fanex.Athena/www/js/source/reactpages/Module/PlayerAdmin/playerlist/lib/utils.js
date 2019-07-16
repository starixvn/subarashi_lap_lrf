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

export const getBaStatusText = (value) => {
    return value ? 'On' : 'Off';
}

export const buildDisplayedColumnObject = (displayedColumnList) => {
    return displayedColumnList.reduce((accumulator, currentItem) => {
        accumulator[currentItem.key] = currentItem.show;
        return accumulator;
    }, {});
}