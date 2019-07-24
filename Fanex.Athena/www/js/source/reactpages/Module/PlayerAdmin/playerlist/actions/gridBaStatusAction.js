import PlayerCommandService from '../lib/playerCommandService';

export const updateBaStatus = (param) => () => {
    const commandService = new PlayerCommandService();

    return commandService.updateBaStatus(param);
}