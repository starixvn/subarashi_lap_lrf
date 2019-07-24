import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';

const apiInfo = {
    updateBaStatus: { action: 'api/PlayerBaStatus/Update', type: systemType.lrf },
    updateOddsGroup: { action: 'api/PlayerOddsGroup/Update', type: systemType.lrf },
    updateSpecialLevel: { action: 'api/PlayerSpecialLevel/Update', type: systemType.lrf },
    updatePlayerStatus: { action: 'PlayerAdminContainer/UpdatePlayerStatus', type: systemType.newAdmin }
}

export default class PlayerCommandService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    updateBaStatus(param) {
        const { updateBaStatus } = apiInfo;

        return this.commonService.fetchData(updateBaStatus.type, updateBaStatus.action, {...param });
    }

    updateOddsGroup(param) {
        const { updateOddsGroup } = apiInfo;

        return this.commonService.fetchData(updateOddsGroup.type, updateOddsGroup.action, {...param });
    }

    updateSpecialLevel(param) {
        const { updateSpecialLevel } = apiInfo;

        return this.commonService.fetchData(updateSpecialLevel.type, updateSpecialLevel.action, {...param });
    }

    updatePlayerStatus(param) {
        const { updatePlayerStatus } = apiInfo;

        return this.commonService.fetchData(updatePlayerStatus.type, updatePlayerStatus.action, {...param });
    }
}