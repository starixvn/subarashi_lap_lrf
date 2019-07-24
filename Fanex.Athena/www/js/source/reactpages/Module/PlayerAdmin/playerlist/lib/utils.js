import { playerStatus } from '../lib/constants';

export const buildSelectedPlayer = (dataItem) => {
    return {
        custId: dataItem.CustId,
        userName: dataItem.UserName,
        currency: dataItem.Currency
    };
}

export const buildCurrentActivePlayer = (dataItem) => {
    return {
        custId: dataItem.CustId,
        status: dataItem.Status
    };
}

export const getSpecialLevelText = (value) => {
    return value === undefined || value === null ? '' : (Number(value) === 0 ? 'None' : value);
}

export const getBaStatusText = (value) => {
    return value ? 'On' : 'Off';
}

export const getPlayerStatus = (value) => {
    const displayedValue = playerStatus[value];

    return displayedValue || '';
}

export const buildDisplayedColumnObject = (displayedColumnList) => {
    return displayedColumnList.reduce((accumulator, currentItem) => {
        accumulator[currentItem.key] = currentItem.show;
        return accumulator;
    }, {});
}