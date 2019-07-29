import PlayerListDataHelper from './playerListDataHelper';
import { buildLapPlayerList } from './utils';

export default class PlayerMultipleQueryService {
    static fetchData(param, commonService, apiInfo) {
        const { lrfSearch, lapSearch } = apiInfo;

        const lrfPromise = commonService.fetchData(lrfSearch.type, lrfSearch.action, {...param });
        const lapPromise = commonService.fetchData(lapSearch.type, lapSearch.action, {...param });

        return this._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
    }

    static _getResult(param, lrfPromise, lapPromise, commonService, apiInfo) {
        return commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList, TotalItem: lrfTotalItem } = lrfResponse.data;
                const { PlayerList: lapPlayerList, TotalItem: lapTotalItem } = lapResponse.data;

                const lrfDataObject = PlayerListDataHelper.getDataObject(lrfPlayerList, lapPlayerList);
                const lapDataObject = PlayerListDataHelper.getDataObject(lapPlayerList, lrfPlayerList);

                const playerList = PlayerListDataHelper.mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
                const totalItem = Math.max(lrfTotalItem, lapTotalItem);
                if (lrfDataObject.differenceList.length === 0 && lapDataObject.differenceList.length === 0) {
                    return { playerList, totalItem };
                }

                const idListNotInLap = lrfDataObject.differenceList.map(x => x.CustId);
                const idListNotInLrf = lapDataObject.differenceList.map(x => x.CustId);

                const lrfParam = {
                    currency: param.currency,
                    idList: idListNotInLrf.join(','),
                    specialLevel: param.specialLevel,
                    pageSize: param.pageSize,
                    pageIndex: param.pageIndex
                }

                const lapParam = {
                    idList: idListNotInLap
                }

                const getFinalResponse = (response) => {
                    const { playerList: nextPlayerList, totalItem: nextTotalItem } = response;

                    return {
                        playerList: playerList.concat(nextPlayerList),
                        totalItem: totalItem + nextTotalItem
                    };
                }

                if (idListNotInLrf.length > 0 && idListNotInLap.length > 0) {
                    return this._refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo).then(getFinalResponse);
                } else if (idListNotInLrf.length > 0) {
                    return this._refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo).then(getFinalResponse);
                } else {
                    return this._refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo).then(getFinalResponse);
                }
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            })
    }

    static _refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo) {
        const { lrfDataById, lapDataById } = apiInfo;
        const nextlrfPromise = commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam });
        const nextlapPromise = commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam });

        return commonService.fetchMultiple([nextlrfPromise, nextlapPromise], (nextLrfResponse, nextLapResponse) => {
                const { DataList: nextLrfPlayerList, TotalItem: nextLrfTotalItem } = nextLrfResponse.data;
                const { PlayerList: nextLapPlayerList, TotalItem: nextLapTotalItem } = nextLapResponse.data;

                const playerListInLap = PlayerListDataHelper.mergePlayerList(lrfDataObject.differenceList, nextLapPlayerList);
                const playerListInLrf = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, lapDataObject.differenceList);

                return {
                    playerList: [...playerListInLap, ...playerListInLrf],
                    totalItem: Math.max(nextLrfTotalItem, nextLapTotalItem)
                }
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            });
    }

    static _refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo) {
        const { lrfDataById } = apiInfo;
        const { differenceList } = lapDataObject;

        return commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam })
            .then(nextLrfResponse => {
                const { DataList: nextLrfPlayerList, TotalItem: nextLrfTotalItem } = nextLrfResponse.data;
                if (!nextLrfPlayerList || !nextLrfPlayerList.length) {
                    return {
                        playerList: buildLapPlayerList(differenceList),
                        totalItem: differenceList.length
                    };
                }

                const playerList = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, differenceList);

                return {
                    playerList,
                    totalItem: nextLrfTotalItem
                };
            })
            .catch((error) => {
                console.log(error.message);
                return {
                    playerList: buildLapPlayerList(differenceList),
                    totalItem: differenceList.length
                };
            });
    }

    static _refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo) {
        const { lapDataById } = apiInfo;
        const { differenceList } = lrfDataObject;

        return commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam })
            .then(nextLapResponse => {
                const { PlayerList: lapPlayerList, TotalItem: nextLapTotalItem } = nextLapResponse.data;
                if (!lapPlayerList || !lapPlayerList.length) {
                    return {
                        playerList: differenceList,
                        totalItem: differenceList.length
                    };
                }

                const playerList = PlayerListDataHelper.mergePlayerList(differenceList, lapPlayerList);

                return {
                    playerList,
                    totalItem: nextLapTotalItem
                };
            })
            .catch((error) => {
                console.log(error.message);
                return {
                    playerList: differenceList,
                    totalItem: differenceList.length
                };
            });
    }
}