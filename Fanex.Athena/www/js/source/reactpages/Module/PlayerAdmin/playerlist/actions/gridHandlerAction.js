import { SET_DISPLAYED_COLUMN_LIST } from './types';

export const setDisplayedColumnList = (data) => {
    return {
        type: SET_DISPLAYED_COLUMN_LIST,
        data
    }
}