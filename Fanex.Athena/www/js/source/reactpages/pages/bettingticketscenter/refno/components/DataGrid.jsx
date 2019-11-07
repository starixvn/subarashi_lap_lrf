import React from 'react';
import { ApiUrl } from '../../common/lib/constants';
import BaseDataGrid from '../../common/components/BaseDataGrid';

const Columns = [
    'Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds',
    'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live'
];
const ColumnWidths = [
    40, 120, 120, 110, 150, 400, 70,
    70, 100, 100, 100, 80, 80, 80
];
const ColumnAlignments = [
    'center-align', '', '', 'center-align', 'center-align', 'right-align', 'right-align',
    'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'
];

const DataGrid = (props) => {
    return (
        <BaseDataGrid
            dataUrl={ApiUrl.REFNO_DATA_URL}
            isPaging={false}
            columns={Columns}
            columnWidths={ColumnWidths}
            columnAlignments={ColumnAlignments}
            totalText=''
            totalColumns={[]}
            sortableColumns={[]}
        />
    );
}

export default DataGrid;