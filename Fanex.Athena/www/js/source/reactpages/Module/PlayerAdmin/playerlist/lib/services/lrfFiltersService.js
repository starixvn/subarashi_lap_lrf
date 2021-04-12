import FactoryCommonService from '../../../../lib/factoryCommonService';
import { systemType } from '../../../../constants/configInfo';

export default class LrfFiltersService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    fetchData(param) {
        var action = 'api/PlayerList/LRFFilters';

        return this.commonService.fetchData(systemType.lrf, action, { hasCommPermissionRead: param.hasCommPermissionRead });
    }
}
