import { SET_LRF_FILTERS } from './types';
import LrfFiltersService from '../lib/services/lrfFiltersService';
import { defaultLRFFilters } from '../lib/default-value';

export const getLRFFilters = (options) => (dispatch) => {
    const service = new LrfFiltersService();

    service.fetchData(options.param).then((response) => {
        const result = response.data;
        dispatch(setLRFFilters(result));

        if (options.callback) {
            options.callback(result);
        }
    }).catch(() => {
        dispatch(setLRFFilters(defaultLRFFilters));
    });
};

const setLRFFilters = (data) => {
    return {
        type: SET_LRF_FILTERS,
        data
    };
};
