import { SET_ACCOUNT_PROFILE, SET_BANK_INFO, SET_ACTIVITY_RECORD } from './types';
import PlayerAccountService from "../lib/playerAccountService";

const setAccountProfile = (data) => {
    return {
        type: SET_ACCOUNT_PROFILE,
        data
    }
}

const setAccountBankInfo = (data) => {
    return {
        type: SET_BANK_INFO,
        data
    }
}

export const setActivityRecord = (data) => {
    return {
        type: SET_ACTIVITY_RECORD,
        data
    }
}

export const getAccountProfile = (param) => (dispatch) => {
    const service = new PlayerAccountService();

    return service.getAccountProfile(param);
}

export const getBankInfo = (param) => (dispatch) => {
    const service = new PlayerAccountService();

    return service.getBankInfo(param);
}