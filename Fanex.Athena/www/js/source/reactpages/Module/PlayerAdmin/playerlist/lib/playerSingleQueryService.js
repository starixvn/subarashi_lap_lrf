import { specialLevelListWithColor, defaultPagingOption } from '../lib/constants';
import PlayerListDataHelper from './playerListDataHelper';

export default class PlayerSingleQueryService {
    constructor(commonService, apiInfo) {
        this.commonService = commonService;
        this.apiInfo = apiInfo;
    }

    getPlayerById(custId) {
        const { lrfDataById, lapDataById } = this.apiInfo;

        const lrfParam = {
            idList: custId,
            specialLevel: Object.keys(specialLevelListWithColor).map(item => item).join(','),
            pageSize: defaultPagingOption.PageSize,
            pageIndex: 1
        }

        const lapParam = {
            idList: [custId]
        }

        const lrfPromise = this.commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam);
        const lapPromise = this.commonService.fetchData(lapDataById.type, lapDataById.action, lapParam);

        return this._getResult(lrfPromise, lapPromise);
    }

    _getResult(lrfPromise, lapPromise) {
        return this.commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList } = lrfResponse.data;
                const { PlayerList: lapPlayerList = [] } = lapResponse.data;

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                return playerList.length ? playerList[0] : null;
            })
            .catch((error) => {
                console.log(error.message);
                return null;
            })
    }
}