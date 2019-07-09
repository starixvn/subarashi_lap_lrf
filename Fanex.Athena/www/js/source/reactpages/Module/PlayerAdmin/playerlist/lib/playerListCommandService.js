import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';

const apiInfo = {
    updateBaStatus: { action: 'api/PlayerListCommand/UpdateBaStatus', type: systemType.lrf },
    updateOddsGroup: { action: 'api/PlayerListCommand/UpdateOddsGroup', type: systemType.lrf },
    updateSpecialLevel: { action: 'api/PlayerListCommand/UpdateSpecialLevel', type: systemType.lrf }
}

export default class PlayerListCommandService {
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
}