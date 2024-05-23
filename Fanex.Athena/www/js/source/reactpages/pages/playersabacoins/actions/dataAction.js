import * as types from './types.js'
import DataService from '@jsroot/lib/DataService.js'
import { toggleLoader } from '@jsroot/actions/loaderAction'

export function getReportData(url, params) {
    return (dispatch) => {
        DataService.postReportData(url, params)
            .then(response => {
                response.data.timestamp = new Date().getTime();
                dispatch(setReportData(response.data));
                dispatch(toggleLoader(false));
            })
            .catch(error => {
                alert("Sorry, an error occurred while processing your request.");
                dispatch(toggleLoader(false));
            });
    };
}

export  const setReportData = data => {
    return {
        type: types.SET_REPORT_DATA,
        data: data
    };
}

export const setReloadReport = data => {
    return {
        type: types.SET_RELOAD_REPORT,
        data: data
    }
}