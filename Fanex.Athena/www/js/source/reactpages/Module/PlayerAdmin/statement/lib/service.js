import DataService from '@jsroot/lib/DataService';
import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

const RelativeUrl = 'PlayerStatement/GetStatementUrl';

export default class Service {
    static getData(param, callBack) {
        const url = Site.resolveClientUrl(RelativeUrl);
        DataService.postData(url, param)
            .then(response => {
                callBack && callBack(response.data);
            })
            .catch(error => {
                console.log(error.message);
                callBack && callBack(null);
            });
    }
}

export const BreadcrumbText = {
    level1: LangHelper.getSingleResource('Statement'),
    level2: LangHelper.getSingleResource('BettingStatement'),
    level3: LangHelper.getSingleResource('BetList')
}

export const Level = {
    level1: 0,
    level2: 1,
    level3: 2
}