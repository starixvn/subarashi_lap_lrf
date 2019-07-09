import PlayerListCommandService from '../lib/playerListCommandService';

export const updateBaStatus = (param) => () => {
    const commandService = new PlayerListCommandService();

    return commandService.updateBaStatus(param);
}

export const updateOddsGroup = (param) => () => {
    const commandService = new PlayerListCommandService();

    return commandService.updateOddsGroup(param);
}

export const updateSpecialLevel = (param) => () => {
    const commandService = new PlayerListCommandService();

    return commandService.updateSpecialLevel(param);
}