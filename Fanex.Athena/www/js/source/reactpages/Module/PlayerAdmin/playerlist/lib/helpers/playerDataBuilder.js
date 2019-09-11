export const buildSelectedPlayer = (dataItem) => {
    const { IbcCustId, UserName, Currency, IsDeposit, IsArchived, LicenseeCustId, CurrencyId } = dataItem;

    return {
        ibcCustId: IbcCustId,
        licenseeCustId: LicenseeCustId,
        userName: UserName,
        currency: Currency,
        isDeposit: IsDeposit,
        isArchived: IsArchived,
        currencyId: CurrencyId
    };
}

export const buildLapPlayerList = (playerList) => {
    if (!playerList) {
        return [];
    }

    return playerList.map(item => {
        const {
            CustId,
            UserName,
            CurrentBalance,
            Currency,
            Status,
            RealName,
            IP,
            email,
            isOnline,
            IBCCustId,
            isArchived,
            LastTransaction,
            CurrencyCode,
            OutBalance,
            IBCUserName
        } = item;

        return {
            IbcCustId: IBCCustId,
            LicenseeCustId: CustId,
            UserName,
            SystemId: IBCUserName,
            Currency: CurrencyCode,
            CurrentBalance,
            OutstandingBalance: OutBalance,
            Status,
            RealName,
            LastTransaction,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: IBCCustId > 0,
            IsArchived: !!isArchived,
            CurrencyId: Currency
        };
    });
}

export const buildCurrentActivePlayer = (dataItem) => {
    const { IbcCustId, UserName, Currency, Status, OddsGroup, SpecialLevel, IsDeposit, IsArchived, LicenseeCustId, CurrencyId } = dataItem;

    return {
        ibcCustId: IbcCustId,
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