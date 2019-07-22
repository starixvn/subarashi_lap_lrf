import PlayerListDataHelper from './playerListDataHelper';

export default class LapPlayerQueryService {
    constructor(commonService, apiInfo) {
        this.commonService = commonService;
        this.apiInfo = apiInfo;
    }

    fetchData(param) {
        const { lrfDataById, lapSearch } = this.apiInfo;

        return this.commonService.fetchData(lapSearch.type, lapSearch.action, {...param })
            .then(lapResponse => {
                const { PlayerList: lapPlayerList = [] } = lapResponse.data;
                if (!lapPlayerList && !lapPlayerList.length) {
                    return PlayerListDataHelper.createEmptyResult();
                }
                const lrfParam = {
                    currency: param.currency,
                    idList: lapPlayerList.map(x => x.CustId).join(','),
                    specialLevel: param.specialLevel,
                    pageSize: param.pageSize,
                    pageIndex: param.pageIndex
                }

                return this.commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam)
                    .then(lrfResponse => {
                        const { DataList: lrfPlayerList, TotalItem } = lrfResponse.data;
                        const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                        return {
                            playerList,
                            totalItem: Math.max(TotalItem, lapPlayerList.length)
                        };
                    })
                    .catch(() => ({
                        playerList: PlayerListDataHelper.mergePlayerList([], lapPlayerList),
                        totalItem: lapPlayerList.length
                    }));
            })
            .catch(() => PlayerListDataHelper.createEmptyResult());
    }
}