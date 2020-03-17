import DataService from '@jsroot/lib/DataService';
import Site from '@jsroot/lib/site';
import LangHelper from '@jsroot/lib/langHelper';
import ReportExcel from './report-excel-service';

export default class DetailTransactionReportService {
    getData(param, callBack) {
        const relativeUrl = 'PlayerDetailTransaction/GetDetailTransactionReport';
        const url = Site.resolveClientUrl(relativeUrl);

        DataService.postData(url, param)
            .then(response => {
                callBack && callBack(response.data);
            })
            .catch(error => {
                console.log(error.message);
                callBack && callBack(null);
            });
    }

    exportData(param, callBack) {
        const relativeUrl = 'PlayerDetailTransaction/ExportDetailTransactionReport';
        const url = Site.resolveClientUrl(relativeUrl);

        DataService.postData(url, param)
            .then(response => {
                new ReportExcel(response.data).export(callBack);
            })
            .catch(error => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                console.log(error.message);
                callBack && callBack(null);
            });
    }
};
