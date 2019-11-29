export default class PlayerListDataHelper {
    static mergePlayerList(lrfList, lapList) {
        if (!lrfList || !lapList) {
            return [];
        }

        return lapList.reduce((result, lapItem) => {
            const lrfItem = lrfList.find(x => x.IbcCustId === lapItem.IBCCustId) || {};
            const playerItem = this.mergePlayerItem(lrfItem, lapItem);
            result.push(playerItem);

            return result;
        }, []);
    }

    static mergePlayerItem(lrfItem, lapItem) {
        const { OddsGroup, BaStatus, SpecialLevel } = lrfItem;
        const { Status, RealName, email, isOnline, IBCCustId, isArchived, LastTransaction, CurrencyCode, OutBalance, IBCUserName, CreatedDateString } = lapItem;

        return {
            IbcCustId: IBCCustId,
            LicenseeCustId: lapItem.CustId,
            UserName: lapItem.UserName,
            SystemId: IBCUserName,
            Currency: CurrencyCode,
            CurrentBalance: lapItem.CurrentBalance,
            OutstandingBalance: OutBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            Status,
            RealName,
            LastTransaction,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: IBCCustId > 0,
            IsArchived: !!isArchived,
            CurrencyId: lapItem.Currency,
            CreatedDate: CreatedDateString
        };
    }

    static getDataObject(targetList, listToMatch) {
        return targetList.reduce((accumulator, currentItem) => {
            const isExist = listToMatch.findIndex(p => this._isMatchIbcCustId(currentItem, p)) !== -1;
            if (isExist) {
                accumulator.commonList.push(currentItem);
            } else {
                accumulator.differenceList.push(currentItem);
            }

            return accumulator;
        }, { commonList: [], differenceList: [] })
    }

    static _isMatchIbcCustId(source, destination) {
        return ((!!destination.IbcCustId || !!source.IBCCustId) && destination.IbcCustId === source.IBCCustId) ||
            ((!!destination.IBCCustId || !!source.IbcCustId) && destination.IBCCustId === source.IbcCustId);
    }

    static createEmptyResult() {
        return {
            playerList: [],
            totalItem: 0
        };
    }
}