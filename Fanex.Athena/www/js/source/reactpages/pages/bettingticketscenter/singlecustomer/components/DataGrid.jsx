import React from 'react';
import { ApiUrl } from '../../common/lib/constants';
import BaseDataGrid from '../../common/components/BaseDataGrid';
import LangHelper from '@jsroot/lib/langHelper';

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
const SortableColumns = ['Stake', 'WinLoss', 'LicenseeWL'];

const DataGrid = (props) => {
    return (
        <BaseDataGrid
            dataUrl={ApiUrl.SINGLECUSTOMER_DATA_URL}
            isPaging={true}
            columns={Columns}
            columnWidths={ColumnWidths}
            columnAlignments={ColumnAlignments}
            totalText={LangHelper.getSingleResource('Total')}
            totalColumns={SortableColumns}
            sortableColumns={SortableColumns}
        />
    );
}

export default DataGrid;