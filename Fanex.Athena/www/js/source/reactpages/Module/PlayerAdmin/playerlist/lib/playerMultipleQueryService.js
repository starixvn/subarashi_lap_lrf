import PlayerListDataHelper from './playerListDataHelper';
export default class PlayerMultipleQueryService {
    constructor(commonService, apiInfo) {
        this.commonService = commonService;
        this.apiInfo = apiInfo;
    }

    fetchData(param) {
        const { lrfSearch, lapSearch } = this.apiInfo;

        const lrfPromise = this.commonService.fetchData(lrfSearch.type, lrfSearch.action, {...param });
        const lapPromise = this.commonService.fetchData(lapSearch.type, lapSearch.action, {...param });

        return this.commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList, TotalItem: lrfTotalItem } = lrfResponse.data;
                const lapResponseData = lapResponse.data;

                // const lrfDifferenceList = PlayerListDataHelper.getDifferenceIdList(lapResponseData.PlayerList, lrfPlayerList);
                // const lapDifferenceList = PlayerListDataHelper.getDifferenceIdList(lrfPlayerList, lapResponseData.PlayerList);

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapResponseData.PlayerList);

                return {
                    playerList,
                    totalItem: lrfTotalItem
                };
            })
            .catch(() => PlayerListDataHelper.createEmptyResult())
    }
}