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

        return this._getResult(param, lrfPromise, lapPromise);
    }

    _getResult(param, lrfPromise, lapPromise) {
        return this.commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList, TotalItem: lrfTotalItem } = lrfResponse.data;
                const { PlayerList: lapPlayerList = [] } = lapResponse.data;

                const lrfDataObject = PlayerListDataHelper.getDataObject(lrfPlayerList, lapPlayerList);
                const lapDataObject = PlayerListDataHelper.getDataObject(lapPlayerList, lrfPlayerList);

                const playerList = PlayerListDataHelper.mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
                const totalItem = Math.max(lrfTotalItem, lapPlayerList.length);
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
                    currency: param.currency,
                    idList: idListNotInLap
                }

                const getFinalResponse = (response) => {
                    const { playerList: nextPlayerList, totalItem: nextTotalItem } = response;

                    return {
                        playerList: playerList.concat(nextPlayerList),
                        totalItem: totalItem + nextTotalItem
                    };
                }

                const { lrfDataById, lapDataById } = this.apiInfo;
                if (idListNotInLrf.length > 0 && idListNotInLap.length > 0) {
                    return this._refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject).then(getFinalResponse);
                } else if (idListNotInLrf.length > 0) {
                    return this._refetchFromLrf(lrfParam, lapDataObject).then(getFinalResponse);
                } else {
                    return this._refetchFromLap(lapParam, lrfDataObject).then(getFinalResponse);
                }
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            })
    }

    _refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject) {
        const { lrfDataById, lapDataById } = this.apiInfo;
        const nextlrfPromise = this.commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam });
        const nextlapPromise = this.commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam });

        return this.commonService.fetchMultiple([nextlrfPromise, nextlapPromise], (nextLrfResponse, nextLapResponse) => {
                const { DataList: nextLrfPlayerList, TotalItem: nextLrfTotalItem } = nextLrfResponse.data;
                const { PlayerList: nextLapPlayerList = [] } = nextLapResponse.data;

                const playerListInLap = PlayerListDataHelper.mergePlayerList(lrfDataObject.differenceList, nextLapPlayerList);
                const playerListInLrf = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, lapDataObject.differenceList);

                return {
                    playerList: [...playerListInLap, ...playerListInLrf],
                    totalItem: Math.max(nextLrfTotalItem, nextLapPlayerList.length)
                }
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            });
    }

    _refetchFromLrf(lrfParam, lapDataObject) {
        const { lrfDataById } = this.apiInfo;
        return this.commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam })
            .then(nextLrfResponse => {
                const { DataList: nextLrfPlayerList, TotalItem: nextLrfTotalItem } = nextLrfResponse.data;
                const playerList = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, lapDataObject.differenceList);

                return {
                    playerList,
                    totalItem: nextLrfTotalItem
                };
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            });
    }

    _refetchFromLap(lapParam, lrfDataObject) {
        const { lapDataById } = this.apiInfo;
        return this.commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam })
            .then(nextLapResponse => {
                const { PlayerList: lapPlayerList = [] } = nextLapResponse.data;
                const playerList = PlayerListDataHelper.mergePlayerList(lrfDataObject.differenceList, lapPlayerList);

                return {
                    playerList,
                    totalItem: lapPlayerList.length
                };
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            });
    }
}