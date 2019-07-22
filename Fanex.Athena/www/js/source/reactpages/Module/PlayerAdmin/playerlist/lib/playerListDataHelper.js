export default class PlayerListDataHelper {
    static mergePlayerList(lrfList, lapList) {
        if (!lrfList || !lapList) {
            return [];
        }

        return lrfList.length > lapList.length ?
            lrfList.map(lrfItem => {
                const lapItem = lapList.find(x => x.CustId === lrfItem.CustId) || {};
                const playerItem = this.mergePlayerItem(lrfItem, lapItem);

                return playerItem;
            }) :
            lapList.map(lapItem => {
                const lrfItem = lrfList.find(x => x.CustId === lapItem.CustId) || {};
                const playerItem = this.mergePlayerItem(lrfItem, lapItem);

                return playerItem;
            });
    }

    static mergePlayerItem(lrfItem, lapItem) {
        const { CustId, UserName, SystemId, Currency, CurrentBalance, OutstandingBalance, OddsGroup, BaStatus, SpecialLevel } = lrfItem;
        const { Status, RealName, IP, email, isOnline } = lapItem;

        return {
            CustId: CustId || lapItem.CustId,
            UserName: UserName || lapItem.UserName,
            SystemId,
            Currency,
            CurrentBalance,
            OutstandingBalance,
            OddsGroup,
            BaStatus,
            SpecialLevel,
            Status,
            RealName,
            LastLoginIp: IP,
            Email: email,
            IsOnline: isOnline
        };
    }

    static getDataObject(targetList, listToMatch) {
        return targetList.reduce((accumulator, currentItem) => {
            const isExist = listToMatch.findIndex(p => p.CustId === currentItem.CustId) !== -1;
            if (isExist) {
                accumulator.commonList.push(currentItem);
            } else {
                accumulator.differenceList.push(currentItem);
            }

            return accumulator;
        }, { commonList: [], differenceList: [] })
    }

    static createEmptyResult() {
        return {
            playerList: [],
            totalItem: 0
        };
    }
}