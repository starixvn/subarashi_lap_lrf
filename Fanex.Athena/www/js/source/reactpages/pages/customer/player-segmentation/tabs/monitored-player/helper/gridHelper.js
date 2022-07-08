import { dataGridFullHeaders } from '../lib/constants';

export const getDataGridHeaders = (hasWritePermission, showSubsidiary) => {
    const fullHeaders = [...dataGridFullHeaders];
    if (!hasWritePermission) {
        const headerIndex = dataGridFullHeaders.findIndex(_ => _.key === 'action');
        fullHeaders.splice(headerIndex, 1);
    }

    if(!showSubsidiary) {
        const headerIndex = dataGridFullHeaders.findIndex(_ => _.key === 'subsidiary');
        fullHeaders.splice(headerIndex, 1);
    }

    return fullHeaders;
} 
