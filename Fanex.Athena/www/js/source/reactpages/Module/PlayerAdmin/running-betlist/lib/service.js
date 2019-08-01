import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';

const HeaderText = {
    Index: "#",
    Platform: LangHelper.getSingleResource("Platform"),
    ExternalId: LangHelper.getSingleResource("ExternalId"),
    SystemId: LangHelper.getSingleResource("SystemId"),
    RefNo: LangHelper.getSingleResource("RefNo"),
    TransTime: LangHelper.getSingleResource("TransTime"),
    Choice: LangHelper.getSingleResource("Choice"),
    Odds: LangHelper.getSingleResource("Odds"),
    OddsType: LangHelper.getSingleResource("OddsType"),
    Stake: LangHelper.getSingleResource("Stake"),
    Status: LangHelper.getSingleResource("Status"),
    Live: LangHelper.getSingleResource("Live")
}

export default class Service {
    static getHeaderText() {
        return HeaderText;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getReportTitle(currency) {
        return currency ? `${LangHelper.getSingleResource('Currency')}: ${currency.toUpperCase()}` : '';
    }

    static getTotalText() {
        return LangHelper.getSingleResource('Total');
    }

    static export(param, callback) {
        const url = Site.resolveClientUrl("PlayerBetlist/ExportRunningBetList");
        DataService.getFile(url, param).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'PlayerAdministratorBetList.xls');
            }

            callback();
        });
    }

    static getData(param, processDataFunc, successCallBack, errorHandle) {
        const url = Site.resolveClientUrl("PlayerBetlist/GetRunningBetList");
        DataService.postData(url, param)
            .then(response => {
                var result = response.data;

                var data = result.Data;
                if (data && data.length > 1) {
                    processDataFunc(data, result.Total);
                }
                else {
                    processDataFunc([], []);
                }

                successCallBack();
            })
            .catch(error => {
                errorHandle();
            });
    }
}