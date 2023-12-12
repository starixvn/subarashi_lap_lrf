import * as types from './types.js'
import axios from 'axios'

import Site from '../../../../lib/site'
import {toggleLoader} from '../../../../actions/loaderAction'

const header = () => {
    return {
        'X-Requested-With': 'XMLHttpRequest',
        '__RequestVerificationToken': Site.getXsrfToken()
    };
}

const fetchData = (params) => {
    const url = Site.resolveClientUrl('NotificationReport/ResultAmendment');
    return axios.post(url, params.data, {
        headers: header()
    });
}

const markNotification = (params) => {
    const url = Site.resolveClientUrl('NotificationReport/MarkNotificationAsRead');
    return axios.post(url, { MessageId: params.id, MessageType: params.type }, {
        headers: header()
    });
}

const downloadData = (params) => {
    const url = Site.resolveClientUrl('NotificationReport/DownLoadFileAttachment');
    return axios.post(url, { FileName: params.fileName } ,{
        headers: header(),
        responseType: 'blob'
    });
}

export const setSelectedViewEvent = data => ({
    type: types.SET_SELECTED_VIEW_EVENT,
    data
})


export function getGridData(params) {
    return (dispatch) => {
        dispatch(toggleLoader(true));
        fetchData(params).then(response => {
            dispatch(setGridData({
                Data: response.data.DataList,
                Total: response.data.TotalRows
            }));
            dispatch(toggleLoader(false));
        }).catch(error => {
            console.log(error);
            dispatch(toggleLoader(false));
        });
    };
}

export function setGridData(data) {
    return {
        type: types.SET_GRID_DATA,
        data: data
    };
}

export function markItemAsRead(params) {   
    return (dispatch) => {
        dispatch(toggleLoader(true));

        markNotification({ id: params.Id, type: params.Type, xsrfToken: Site.getXsrfToken()}).then(response => {
            if(response.data.IsSuccessful)
            {
                params.Data[params.Index].IsRead = true;

                dispatch(setGridData({
                    Data: params.Data,
                    Total: params.Total
                }));

                dispatch(toggleLoader(false));

            }
        }).catch(error => {
            console.log(error);
            dispatch(toggleLoader(false));
        });
    };
}

export function exportAttachment(params) {
    return () => downloadData(params);
}