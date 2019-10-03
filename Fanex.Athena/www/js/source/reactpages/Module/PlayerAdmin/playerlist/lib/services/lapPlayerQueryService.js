import PlayerListDataHelper from '../helpers/playerListDataHelper';
import { getCustIdListFromLapData, isNonDepositOrArchived } from '../helpers/utils';
import { buildLapPlayerList } from '../helpers/playerDataBuilder';

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
        const nonDepositOrArchivedList = lapPlayerList.filter(x => isNonDepositOrArchived(x));

        if (idList.length === 0) {
            return {
                playerList: buildLapPlayerList(nonDepositOrArchivedList),
                totalItem: lapTotalItem
            }
        }

        const lrfParam = {
            currencyIdList: param.currencyIdList,
            idList: idList.join(','),
            specialLevel: param.specialLevel,
            oddsGroup: param.oddsGroup,
            baFilter: param.baFilter,
            pageSize: param.pageSize,
            pageIndex: 1
        }

        return commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam)
            .then(lrfResponse => {
                const { DataList: lrfPlayerList } = lrfResponse.data;
                const filteredLapPlayerList = lapPlayerList.filter(x => x.IBCCustId === 0 ||
                    lrfPlayerList.findIndex(p => p.IbcCustId === x.IBCCustId) !== -1);
                const filteredItemCount = lapPlayerList.length - filteredLapPlayerList.length;
                const totalItem = lapTotalItem - filteredItemCount;

                if (!lrfPlayerList || !lrfPlayerList.length) {
                    return {
                        playerList: buildLapPlayerList(filteredLapPlayerList),
                        totalItem
                    }
                }

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, filteredLapPlayerList);

                return {
                    playerList,
                    totalItem
                };
            })
            .catch(() => {
                return {
                    playerList: buildLapPlayerList(nonDepositOrArchivedList),
                    totalItem: nonDepositOrArchivedList.length
                }
            });
    }
}