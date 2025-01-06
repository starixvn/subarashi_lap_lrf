import * as types from './types.js'
import DataService from '@jsroot/lib/DataService.js'
import { toggleLoader } from '@jsroot/actions/loaderAction'
import { setSweetAlertOption } from './filterAction'
import { generateDefaultAlertOption, predefinedIcons } from '@jsroot/lib/sweetAlert';
import LangHelper from '@jsroot/lib/langHelper';
import {decode} from '@jsroot/lib/htmlHelper';
import NumberFormat from '@jsroot/lib/numberFormat'


const _showWarning = (dispatch, limitRows) => {
    const handleCloseAlert = () => {
        dispatch(setSweetAlertOption(null));
    }

    const title = LangHelper.getSingleResource("Alert");
    const message = decode(LangHelper.getSingleResource("BTCMaxTicketLimitMsg")).replace("{0}", NumberFormat.formatInteger(limitRows));
    const alertOpt = generateDefaultAlertOption(message, handleCloseAlert, null, predefinedIcons.error);

    dispatch(setSweetAlertOption({ ...alertOpt, title, width: 480, height: 230 }));
}


export function getGridData(url, params) {
    return (dispatch) => {
        DataService.postData(url, params)
            .then(response => {
                if (response.data.StatusCode === 1001) {
                    _showWarning(dispatch, response.data.LimitRows);
                    dispatch(toggleLoader(false));
                    return;
                }

                response.data.timestamp = new Date().getTime();
                dispatch(setGridData(response.data));
            })
            .catch(error => {
                alert("Sorry, an error occurred while processing your request.");
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