import React, { memo } from 'react';
import { ApiUrl } from '../../../common/lib/constants';
import BaseDataGrid from '../../../common/components/BaseDataGrid';
import LangHelper from '@jsroot/lib/langHelper';

var Columns = [
    'Index', 'ExternalId', 'SystemId', 'BookedId', 'RefNo', 'BookedTime', 'Choice', 'OddsLower',
    'OddsUpper', 'OddsType', 'Stake', 'Status', 'Platform',
];
var ColumnWidths = [
    40, 120, 120, 160, 160, 100, 270, 75,
    75, 70, 100, 150, 100
];
var ColumnAlignments = [
    'center-align', '', '', 'center-align tooltip', 'center-align tooltip', 'center-align', 'right-align', 'right-align',
    'right-align', 'right-align', 'right-align', 'center-align', 'center-align'
];
const SortableColumns = ['Stake'];

const DataGrid = (props) => {
    return (
        <BaseDataGrid
            dataUrl={ApiUrl.BOOKEDBET_DATA_URL}
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

export default memo(DataGrid);
