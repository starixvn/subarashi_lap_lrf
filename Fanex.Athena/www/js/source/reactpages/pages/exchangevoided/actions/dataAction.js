import { toggleLoader } from '@jsroot/actions/loaderAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import ReportExcel from '../lib/reportExcel';
import { saveAs } from 'file-saver'

const SUCCESS_CODE = 1;
const UM_ERR_CODE = 1041;
const UM_MESSAGE = 'Exchange product is under maintenance now';
const ERROR_MESSAGE = 'Your request cannot be processed now, please try again later';

const dispatchResult = (dispatch, data) => {
    dispatch(setGridData(data));
    dispatch(toggleLoader(false));
}

const apiUrl = Site.resolveClientUrl('ExchangeVoided/Index');
const runningUrl = 'api/Exchange/GetRunningTickets'
const runningExportExcelUrl =  'api/Exchange/ExportRunningTickets';

export const getData = (param) => (dispatch) => {
    dispatch(toggleLoader(true));
    DataService.postData(apiUrl, param)
        .then(response => {
            const { dataList, totalPage, errCode } = response.data;
            const isSuccess = errCode === SUCCESS_CODE;
            const data = {
                dataList: isSuccess ? dataList : [],
                totalPage: param.refNo ? 0 : totalPage
            };
            dispatchResult(dispatch, data);

            !isSuccess && window.alert(errCode === UM_ERR_CODE ? UM_MESSAGE : ERROR_MESSAGE);
        })
        .catch(error => {
            console.error(error.message);
            window.alert(ERROR_MESSAGE);
            dispatchResult(dispatch, { dataList: [], totalPage: 0 });
        });
}

export const getRunningTicketData = (param) => (dispatch) =>{
    dispatch(toggleLoader(true));
    DataService.postProxyData(DataService.apiKeys.report, runningUrl , param)
        .then(response => {
            const { dataList, totalRows, sumStake } = response.data;
            const data = {
                dataList: dataList,
                totalPage: totalRows,
                sumStake: sumStake
            };
            dispatchResult(dispatch, data);
        })
        .catch(error => {
            console.error(error.message);
            window.alert(ERROR_MESSAGE);
            dispatchResult(dispatch, { dataList: [], totalPage: 0 });
        });
}

export const exportExcel = (dataList, title) => () => {
    const service = new ReportExcel(dataList, title);
    service.export();
}

export const exportRunningTicketExcel = (param) => (dispatch) => {
    if (!param) {
        return;
    }

    const proxyUrl = DataService.buildProxyUrl(DataService.apiKeys.report, runningExportExcelUrl)
    dispatch(toggleLoader(true));
    DataService.getFile(proxyUrl, param)
        .then((response) => {
            const fileName = "ExchangeRunningTicket.xls";
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            saveAs(blob, fileName);
        })
        .catch(() => {
            alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
        })
        .finally(() => {
            dispatch(toggleLoader(false));
        });
}