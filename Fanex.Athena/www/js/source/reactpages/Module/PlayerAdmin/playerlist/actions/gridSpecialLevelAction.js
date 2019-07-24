import { SET_SPECIAL_LEVEL_POSITION } from './types';
import PlayerCommandService from '../lib/playerCommandService';

export const setSpecialLevelDropdownPosition = (data) => {
    return {
        type: SET_SPECIAL_LEVEL_POSITION,
        data
    }
}

export const updateSpecialLevel = (param) => () => {
    const commandService = new PlayerCommandService();

    return commandService.updateSpecialLevel(param);
}