import { playerStatus } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

export const buildSelectedPlayer = (dataItem) => {
    return {
        custId: dataItem.CustId,
        userName: dataItem.UserName,
        currency: dataItem.Currency,
        isDeposit: dataItem.IsDeposit,
        isArchived: dataItem.IsArchived
    };
}

export const buildLapPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const { CustId, UserName, Status, RealName, IP, email, isOnline, ActStatus, IBCCustId, isArchived } = item;

        return {
            CustId,
            UserName,
            Status,
            RealName,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: ActStatus === 2 && IBCCustId > 0,
            IsArchived: isArchived
        };
    });
}

export const buildCurrentActivePlayer = (dataItem) => {
    const { CustId, UserName, Currency, Status, OddsGroup, SpecialLevel, IsDeposit, IsArchived } = dataItem;

    return {
        custId: CustId,
        userName: UserName,
        currency: Currency,
        status: Status,
        oddsGroup: OddsGroup,
        specialLevel: SpecialLevel,
        isDeposit: IsDeposit,
        isArchived: IsArchived
    };
}

export const getSpecialLevelText = (value) => {
    return value === undefined || value === null ? '' : (Number(value) === 0 ? LangHelper.getSingleResource('None') : value);
}

export const getBaStatusText = (value) => {
    return value ? LangHelper.getSingleResource('On') : LangHelper.getSingleResource('Off');
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