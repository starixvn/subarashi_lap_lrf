import PlayerListDataHelper from './playerListDataHelper';
import { getCustIdListFromLapData } from './utils';
import { buildLapPlayerList } from './playerDataBuilder';

export default class LapPlayerQueryService {
    static fetchData(param, commonService, apiInfo) {
        const { lrfDataById, lapSearch } = apiInfo;

        return commonService.fetchData(lapSearch.type, lapSearch.action, {...param })
            .then(lapResponse => {
                const { PlayerList: lapPlayerList = [], TotalItem: lapTotalItem = 0 } = lapResponse.data;
                if (!lapPlayerList || !lapPlayerList.length) {
                    return PlayerListDataHelper.createEmptyResult();
                }

                return this._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem);
            })
            .catch(() => PlayerListDataHelper.createEmptyResult());
    }

    static _fetchFromLrf(param, lrfDataById, lapPlayerList, commonService, lapTotalItem) {
        const idList = getCustIdListFromLapData(lapPlayerList);
        const lrfParam = {
            currencyIdList: param.currencyIdList,
            idList: idList.join(','),
            specialLevel: param.specialLevel,
            pageSize: param.pageSize,
            pageIndex: param.pageIndex
        }

        return commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam)
            .then(lrfResponse => {
                const { DataList: lrfPlayerList, TotalItem } = lrfResponse.data;
                if (!lrfPlayerList || !lrfPlayerList.length) {
                    return {
                        playerList: buildLapPlayerList(lapPlayerList),
                        totalItem: lapTotalItem
                    }
                }

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                return {
                    playerList,
                    totalItem: Math.max(TotalItem, lapTotalItem)
                };
            })
            .catch(() => ({
                playerList: buildLapPlayerList(lapPlayerList),
                totalItem: lapTotalItem
            }));
    }
}