import { playerStatus } from '../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';
import { playerTypes } from './constants';

export const getSpecialLevelText = (value) => {
    return value === undefined || value === null ? '' : (Number(value) === 0 ? LangHelper.getSingleResource('None') : value);
}

export const getBaStatusText = (value) => {
    return value ? LangHelper.getSingleResource('On') : LangHelper.getSingleResource('Off');
}

export const getPlayerStatus = (value) => {
    const displayedValue = playerStatus[value];

    return displayedValue || '';
}

export const buildDisplayedColumnObject = (displayedColumnList) => {
    return displayedColumnList.reduce((accumulator, currentItem) => {
        accumulator[currentItem.key] = currentItem.show;
        return accumulator;
    }, {});
}

export const isDeposit = (ibcCustId, actStatus) => {
    return actStatus === playerTypes.deposit || ibcCustId > 0;
}

export const getCustIdListFromLapData = (lapPlayerList) => {
    return lapPlayerList.reduce((result, item) => {
        if (isDeposit(item.IBCCustId, item.ActStatus)) {
            result.push(item.IBCCustId);
        }

        return result;
    }, []);
}