import { playerTypes } from './constants';

export const buildSelectedPlayer = (dataItem) => {
    const { CustId, UserName, Currency, IsDeposit, IsArchived, LicenseeCustId, CurrencyId } = dataItem;

    return {
        custId: CustId,
        licenseeCustId: LicenseeCustId,
        userName: UserName,
        currency: Currency,
        isDeposit: IsDeposit,
        isArchived: IsArchived,
        currencyId: CurrencyId
    };
}

export const buildLrfPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const {
            CustId,
            UserName,
            SystemId,
            Currency,
            CurrentBalance,
            OutstandingBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            CurrencyId
        } = item;

        return {
            CustId,
            LicenseeCustId: 0,
            UserName,
            SystemId,
            Currency,
            CurrentBalance,
            OutstandingBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            IsDeposit: true,
            IsArchived: false,
            CurrencyId: CurrencyId || 0
        };
    });
}

export const buildLapPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const {
            UserName,
            Status,
            RealName,
            IP,
            email,
            isOnline,
            ActStatus,
            IBCCustId,
            isArchived,
            CustId,
            CurrencyCode,
            CurrentBalance,
            OutBalance,
            Currency
        } = item;

        return {
            CustId: IBCCustId,
            LicenseeCustId: CustId,
            UserName,
            Status,
            RealName,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: ActStatus === playerTypes.deposit && IBCCustId > 0,
            IsArchived: isArchived,
            Currency: CurrencyCode,
            CurrentBalance,
            OutstandingBalance: OutBalance,
            CurrencyId: Currency || 0
        };
    });
}

export const buildCurrentActivePlayer = (dataItem) => {
    const { CustId, UserName, Currency, Status, OddsGroup, SpecialLevel, IsDeposit, IsArchived, LicenseeCustId, CurrencyId } = dataItem;

    return {
        custId: CustId,
        licenseeCustId: LicenseeCustId,
        userName: UserName,
        currency: Currency,
        status: Status,
        oddsGroup: OddsGroup,
        specialLevel: SpecialLevel,
        isDeposit: IsDeposit,
        isArchived: IsArchived,
        currencyId: CurrencyId
    };
}