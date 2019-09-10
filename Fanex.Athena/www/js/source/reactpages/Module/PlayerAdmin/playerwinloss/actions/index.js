import { SET_GRID_DATA } from './types';
import { toggleLoader } from '@jsroot/actions/loaderAction';
import DataService from '@jsroot/lib/DataService';
import Site from '@jsroot/lib/site';
import ReportExcel from '../lib/reportExcel';

const getData = (param) => (dispatch) => {
    const url = Site.resolveClientUrl('PlayerWinLoss/Index');
    toggleLoader(true);
    DataService.postData(url, param)
        .then(response => {
            dispatch(setGridData(response.data.Data));
            dispatch(toggleLoader(false));
        })
        .catch(error => {
            console.log(error.message);
            dispatch(setGridData([]));
            dispatch(toggleLoader(false));
        });
}

const setGridData = (data) => {
    return {
        type: SET_GRID_DATA,
        data
    }
}

const exportExcel = (data, hasCustomerComm, isAllowedBA, title) => () => {
    const reportExcel = new ReportExcel(data, hasCustomerComm, isAllowedBA, title);
    reportExcel.export();
}

export const ActionCreators = Object.assign({}, { getData, exportExcel });