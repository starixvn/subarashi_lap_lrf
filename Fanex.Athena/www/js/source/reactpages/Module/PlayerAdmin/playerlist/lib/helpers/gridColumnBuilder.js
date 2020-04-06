import { fields, columnList, licenseeType } from '../constants';

const excludedKeyForApiType = [fields.RealName, fields.Email, fields.LastTransaction];

export const buildDefaultColumnList = (licType, hasCommPermissionRead) => {
    const isApiType = licType === licenseeType.api;

    return columnList.filter(item => {
        const show = item.key === fields.CommissionGroup ? hasCommPermissionRead : item.key !== fields.BaStatus;

        return show && (!isApiType || !excludedKeyForApiType.includes(item.key));
    }).map(item => ({ ...item }))
}

export const buildColumnList = (licType, isAllowedBA, hasCommPermissionRead) => {
    const isApiType = licType === licenseeType.api;

    return columnList.filter(item => {
        if (item.key === fields.BaStatus) {
            return isAllowedBA;
        } else if (item.key === fields.CommissionGroup) {
            return hasCommPermissionRead;
        } else if (isApiType) {
            return !excludedKeyForApiType.includes(item.key);
        } else {
            return true;
        }
    }).map(item => ({ ...item }))
};
