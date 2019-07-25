import { playerStatus } from '../lib/constants';

export const buildSelectedPlayer = (dataItem) => {
    return {
        custId: dataItem.CustId,
        userName: dataItem.UserName,
        currency: dataItem.Currency
    };
}

export const buildLapPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const { CustId, UserName, Status, RealName, IP, email, isOnline } = item;

        return {
            CustId,
            UserName,
            Status,
            RealName,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline
        };
    });
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