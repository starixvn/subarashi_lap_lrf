import * as types from './types.js'
export const setReportBy = (value) => {
    return {
        type: types.SET_REPORTBY,
        data: value
    }
}

export const setViewInOption = (value) => {
    return{
        type: types.SET_VIEWINOPTION,
        data: value
    }
}

export const setParams = (value) => {
    return {
        type: types.SET_PARAM,
        data: value
    }
}

export const changeIsViewResettledTicketOnly = (checked) => {
    return {
        type: types.CHANGE_ISVIEW_RESETTLED_TICKET_ONLY,
        data: checked
    }
}