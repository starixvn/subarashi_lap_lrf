import PlayerCommandService from '../lib/playerCommandService';

export const updateBaStatus = (param) => () => {
    const commandService = new PlayerCommandService();

    return commandService.updateBaStatus(param);
}

export const updateOddsGroup = (param) => () => {
    const commandService = new PlayerCommandService();

    return commandService.updateOddsGroup(param);
}

export const updateSpecialLevel = (param) => () => {
    const commandService = new PlayerCommandService();

    return commandService.updateSpecialLevel(param);
}