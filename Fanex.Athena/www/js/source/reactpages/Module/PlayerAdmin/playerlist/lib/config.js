import { fields, columnList, licenseeType } from './constants';

const excludedKeyForApiType = [fields.RealName, fields.LastLoginIp, fields.Email];

export const generateColumnList = (licType, hasBaPermission) => {
    const isApiType = licType === licenseeType.api;

    return columnList.filter(item => {
        if (item.key === fields.BaStatus) {
            return hasBaPermission;
        } else if (isApiType) {
            return !excludedKeyForApiType.includes(item.key);
        } else {
            return true;
        }
    }).map(item => ({...item }))
};