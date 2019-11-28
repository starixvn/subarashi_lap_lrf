export const buildSelectedPlayer = (dataItem) => {
    const { IbcCustId, UserName, Currency, IsDeposit, IsArchived, LicenseeCustId, CurrencyId, CreatedDate } = dataItem;

    return {
        ibcCustId: IbcCustId,
        licenseeCustId: LicenseeCustId,
        userName: UserName,
        currency: Currency,
        isDeposit: IsDeposit,
        isArchived: IsArchived,
        currencyId: CurrencyId,
        createdDate: CreatedDate
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
            email,
            isOnline,
            IBCCustId,
            isArchived,
            LastTransaction,
            CurrencyCode,
            OutBalance,
            IBCUserName,
            CreatedDateString
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
            Email: email,
            IsOnline: isOnline,
            IsDeposit: IBCCustId > 0,
            IsArchived: !!isArchived,
            CurrencyId: Currency,
            CreatedDate: CreatedDateString
        };
    });
}

export const buildCurrentActivePlayer = (dataItem) => {
    const { IbcCustId, UserName, Currency, Status, OddsGroup, SpecialLevel, IsDeposit, IsArchived, LicenseeCustId, CurrencyId, CreatedDate } = dataItem;

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
        currencyId: CurrencyId,
        createdDate: CreatedDate
    };
}