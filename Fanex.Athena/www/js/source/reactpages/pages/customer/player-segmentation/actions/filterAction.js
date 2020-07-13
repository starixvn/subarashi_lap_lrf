import { SET_SUBSIDIARY_LIST } from './types';

export const setSubsidiaryList = susidiaryList => {
    return {
        type: SET_SUBSIDIARY_LIST,
        data: susidiaryList
    }
}