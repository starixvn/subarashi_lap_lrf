import DataService from '@jsroot/lib/DataService';
import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';

const RelativeUrl = 'PlayerStatement/GetStatementUrl';

export default class Service {
    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl(RelativeUrl);
        DataService.postData(url, param)
            .then(response => {
                processDataFunc && processDataFunc(response.data);

                successCallBack && successCallBack();
            })
            .catch(error => {
                processDataFunc && processDataFunc(null);
                errorHandle && errorHandle();
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