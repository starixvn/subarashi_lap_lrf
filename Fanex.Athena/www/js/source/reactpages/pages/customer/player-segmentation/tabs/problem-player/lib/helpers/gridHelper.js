import { dataGridFullHeaders } from '../constants';

export const getDataGridHeaders = hasVipManagement => {
    if (!hasVipManagement) {
        const headerIndex = dataGridFullHeaders.findIndex(_ => _.key === 'vip');
        const fullHeaders = [...dataGridFullHeaders];
        fullHeaders.splice(headerIndex, 1);
        return fullHeaders;
    }
    return dataGridFullHeaders;
} 
