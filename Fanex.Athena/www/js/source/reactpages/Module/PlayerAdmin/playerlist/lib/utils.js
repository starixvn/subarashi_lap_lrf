import { playerStatus } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';
import { playerTypes } from './constants';

export const buildSelectedPlayer = (dataItem) => {
    const { CustId, UserName, Currency, IsDeposit, IsArchived } = dataItem;

    return {
        custId: CustId,
        userName: UserName,
        currency: Currency,
        isDeposit: IsDeposit,
        isArchived: IsArchived
    };
}

export const buildLrfPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const { CustId, UserName, SystemId, Currency, CurrentBalance, OutstandingBalance, OddsGroup, BaStatus, SpecialLevel } = item;

        return {
            CustId,
            UserName,
            SystemId,
            Currency,
            CurrentBalance,
            OutstandingBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            IsDeposit: true,
            IsArchived: false
        };
    });
}

export const buildLapPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const { UserName, Status, RealName, IP, email, isOnline, ActStatus, IBCCustId, isArchived } = item;

        return {
            CustId: IBCCustId,
            UserName,
            Status,
            RealName,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: ActStatus === playerTypes.deposit && IBCCustId > 0,
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

export const isDeposit = (ibcCustId, actStatus) => {
    return actStatus === playerTypes.deposit || ibcCustId > 0;
}

export const getCustIdListFromLapData = (lapPlayerList) => {
    return lapPlayerList.reduce((result, item) => {
        if (isDeposit(item.IBCCustId, item.ActStatus)) {
            result.push(item.IBCCustId);
        }

        return result;
    }, []);
}