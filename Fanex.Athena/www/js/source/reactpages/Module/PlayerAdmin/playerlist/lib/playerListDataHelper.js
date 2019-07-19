export default class PlayerListDataHelper {
    static mergePlayerList(lrfList, lapList) {
        const lrfDataObject = this._getDataObject(lrfList, lapList);
        const lapDataObject = this._getDataObject(lapList, lrfList);
        const result = [];

        const { commonList: lrfCommonList, differenceList: lrfDifferenceList } = lrfDataObject;
        const { commonList: lapCommonList, differenceList: lapDifferenceList } = lapDataObject;
        for (let i = 0; i < lrfCommonList.length; i++) {
            const lrfItem = lrfCommonList[i];
            const lapItem = lapCommonList.find(x => x.CustId === lrfItem.CustId) || {};

            const { CustId, UserName, SystemId, Currency, CurrentBalance, OutstandingBalance, OddsGroup, BaStatus, SpecialLevel } = lrfItem;
            const { Status, RealName, IP, email, isOnline } = lapItem;

            result.push({
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
            });
        }

        return result.concat(lrfDifferenceList, lapDifferenceList);
    }

    static _getDataObject(targetList, listToMatch) {
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

    static getDifferenceIdList(sourceList, listToCheck) {
        return listToCheck.filter(x => sourceList.findIndex(s => s.CustId === x.CustId) === -1)
            .map(p => p.CustId);
    }

    static createEmptyResult() {
        return {
            playerList: [],
            totalItem: 0
        };
    }
}