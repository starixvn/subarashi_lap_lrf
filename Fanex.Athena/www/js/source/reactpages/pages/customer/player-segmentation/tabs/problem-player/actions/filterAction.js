import * as types from './types';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';

export const changeIsGetAll = isGetAll => {
    return {
        type: types.SET_IS_GET_ALL,
        data: isGetAll
    }
}

export const setDateRange = dateRangeAction.setDateRange;
