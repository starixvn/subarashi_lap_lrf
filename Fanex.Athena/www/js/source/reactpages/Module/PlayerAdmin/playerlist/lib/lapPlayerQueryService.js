import PlayerListDataHelper from './playerListDataHelper';
import { buildLapPlayerList } from './utils';

export default class LapPlayerQueryService {
    static fetchData(param, commonService, apiInfo) {
        const { lrfDataById, lapSearch } = apiInfo;

        return commonService.fetchData(lapSearch.type, lapSearch.action, { ...param })
            .then(lapResponse => {
                const { PlayerList: lapPlayerList = [] } = lapResponse.data;
                if (!lapPlayerList || !lapPlayerList.length) {
                    return PlayerListDataHelper.createEmptyResult();
                }

                return this._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService);
            })
            .catch(() => PlayerListDataHelper.createEmptyResult());
    }

    static _fetchFromLrf(param, lrfDataById, lapPlayerList, commonService) {
        const lrfParam = {
            currency: param.currency,
            idList: lapPlayerList.map(x => x.CustId).join(','),
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
                        totalItem: lapPlayerList.length
                    }
                }

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                return {
                    playerList,
                    totalItem: Math.max(TotalItem, lapPlayerList.length)
                };
            })
            .catch(() => ({
                playerList: buildLapPlayerList(lapPlayerList),
                totalItem: lapPlayerList.length
            }));
    }
}