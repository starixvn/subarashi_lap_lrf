import PlayerListDataHelper from './playerListDataHelper';

export default class LrfPlayerQueryService {
    static fetchData(param, commonService, apiInfo) {
        const { lrfSearch, lapDataById } = apiInfo;

        return commonService.fetchData(lrfSearch.type, lrfSearch.action, {...param })
            .then(lrfResponse => {
                const { DataList: lrfPlayerList, TotalItem } = lrfResponse.data;
                if (!lrfPlayerList || !lrfPlayerList.length) {
                    return PlayerListDataHelper.createEmptyResult();
                }

                const custIdList = lrfPlayerList.map(x => x.CustId);
                const lapParam = {
                    currency: param.currency,
                    idList: custIdList
                }

                return commonService.fetchData(lapDataById.type, lapDataById.action, lapParam)
                    .then(lapResponse => {
                        const { PlayerList: lapPlayerList } = lapResponse.data;

                        const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                        return {
                            playerList,
                            totalItem: Math.max(TotalItem, lapPlayerList.length)
                        };
                    })
                    .catch(() => ({
                        playerList: lrfPlayerList,
                        totalItem: TotalItem
                    }));
            })
            .catch(() => PlayerListDataHelper.createEmptyResult());
    }
}