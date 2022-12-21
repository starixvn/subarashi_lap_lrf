import * as types from './types.js'

 const setSelectedSport = (sportId) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: sportId
    };
}

export default {
    setSelectedSport
}
