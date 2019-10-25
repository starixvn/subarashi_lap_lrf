import { fields, columnList, licenseeType } from '../constants';

const excludedKeyForApiType = [fields.RealName, fields.Email, fields.LastTransaction];

export const buildDefaultColumnList = (licType) => {
    const isApiType = licType === licenseeType.api;

    return columnList.filter(item => {
        return item.key !== fields.BaStatus && (!isApiType || !excludedKeyForApiType.includes(item.key));
    }).map(item => ({...item }))
}

export const buildColumnList = (licType, isAllowedBA) => {
    const isApiType = licType === licenseeType.api;

    return columnList.filter(item => {
        if (item.key === fields.BaStatus) {
            return isAllowedBA;
        } else if (isApiType) {
            return !excludedKeyForApiType.includes(item.key);
        } else {
            return true;
        }
    }).map(item => ({...item }))
};