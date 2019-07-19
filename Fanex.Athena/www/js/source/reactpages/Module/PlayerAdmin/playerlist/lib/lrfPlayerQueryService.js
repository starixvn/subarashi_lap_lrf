import PlayerListDataHelper from './playerListDataHelper';

export default class LrfPlayerQueryService {
    constructor(commonService, apiInfo) {
        this.commonService = commonService;
        this.apiInfo = apiInfo;
    }

    fetchData(param) {
        const { lrfSearch, lapDataById } = this.apiInfo;

        return this.commonService.fetchData(lrfSearch.type, lrfSearch.action, {...param })
            .then(lrfResponse => {
                const lrfPlayerList = lrfResponse.data.DataList;
                if (!lrfPlayerList && !lrfPlayerList.length) {
                    return PlayerListDataHelper.createEmptyResult();
                }

                const custIdList = lrfPlayerList.map(x => x.CustId);
                const lapParam = {
                    currency: param.currency,
                    idList: custIdList
                }

                return this.commonService.fetchData(lapDataById.type, lapDataById.action, lapParam)
                    .then(lapResponse => {
                        const lapPlayerList = lapResponse.data.PlayerList;

                        const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                        return {
                            playerList,
                            totalItem: lrfResponse.data.TotalItem
                        };
                    });
            })
            .catch(() => PlayerListDataHelper.createEmptyResult());
    }
}