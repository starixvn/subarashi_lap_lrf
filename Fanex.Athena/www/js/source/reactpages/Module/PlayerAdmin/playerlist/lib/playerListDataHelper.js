import { playerTypes } from './constants';
export default class PlayerListDataHelper {
    static mergePlayerList(lrfList, lapList) {
        if (!lrfList || !lapList) {
            return [];
        }

        return lrfList.length > lapList.length ?
            lrfList.reduce((result, lrfItem) => {
                const lapItem = lapList.find(x => x.IBCCustId === lrfItem.CustId) || {};
                const playerItem = this.mergePlayerItem(lrfItem, lapItem);
                result.push(playerItem);

                return result;
            }, []) :
            lapList.reduce((result, lapItem) => {
                const lrfItem = lrfList.find(x => x.CustId === lapItem.IBCCustId) || {};
                const playerItem = this.mergePlayerItem(lrfItem, lapItem);
                result.push(playerItem);

                return result;
            }, []);
    }

    static mergePlayerItem(lrfItem, lapItem) {
        const { CustId, UserName, SystemId, Currency, CurrentBalance, OutstandingBalance, OddsGroup, BaStatus, SpecialLevel, CurrencyId } = lrfItem;
        const { Status, RealName, IP, email, isOnline, ActStatus, IBCCustId, isArchived, LastTransaction, CurrencyCode, OutBalance, IBCUserName } = lapItem;

        return {
            CustId: CustId || IBCCustId,
            LicenseeCustId: lapItem.CustId,
            UserName: UserName || lapItem.UserName,
            SystemId: SystemId || IBCUserName,
            Currency: Currency || CurrencyCode,
            CurrentBalance: CurrentBalance || lapItem.CurrentBalance,
            OutstandingBalance: OutstandingBalance || OutBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            Status,
            RealName,
            LastTransaction,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline,
            IsDeposit: (ActStatus === playerTypes.deposit && IBCCustId > 0) || CustId > 0,
            IsArchived: !!isArchived,
            CurrencyId: CurrencyId || lapItem.Currency || 0
        };
    }

    static getDataObject(targetList, listToMatch) {
        return targetList.reduce((accumulator, currentItem) => {
            const isExist = listToMatch.findIndex(p => this._isMatchCustId(currentItem, p)) !== -1;
            if (isExist) {
                accumulator.commonList.push(currentItem);
            } else {
                accumulator.differenceList.push(currentItem);
            }

            return accumulator;
        }, { commonList: [], differenceList: [] })
    }

    static _isMatchCustId(source, destination) {
        return ((!!destination.CustId || !!source.IBCCustId) && destination.CustId === source.IBCCustId) ||
            ((!!destination.IBCCustId || !!source.CustId) && destination.IBCCustId === source.CustId);
    }

    static createEmptyResult() {
        return {
            playerList: [],
            totalItem: 0
        };
    }
}