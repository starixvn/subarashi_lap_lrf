import React, { memo } from 'react';
import { ApiUrl } from '../../../common/lib/constants';
import BaseDataGrid from '../../../common/components/BaseDataGrid';
import AppData from '@jsroot/lib/AppData';
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

const defaultColumns = [
    'Index', 'ExternalId', 'SystemId', 'RefNo', 'TransTime', 'Choice', 'Odds',
    'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live'
];
const defaultColumnWidths = [
    40, 120, 120, 160, 140, 370, 70,
    70, 100, 100, 100, 110, 80, 80
];
const defaultColumnAlignments = [
    'center-align', '', '', 'center-align tooltip', 'center-align', 'right-align', 'right-align',
    'right-align', 'right-align', 'right-align', 'right-align', 'center-align', 'center-align', 'center-align'
];

const DataGrid = (props) => {

    const requestParam = useSelector( state => state.requestParam);
    var Columns = [...defaultColumns];
    var ColumnWidths = [...defaultColumnWidths];
    var ColumnAlignments = [...defaultColumnAlignments];

    if (AppData.isAllowSabaCoins && requestParam.ViewSabaCoins && Columns.includes('LicenseeWL')) {
        Columns.splice(10, 1);
        ColumnWidths.splice(10, 1);
        ColumnAlignments.splice(10, 1);
    }

    if (AppData.isAllowTxIDColumn && !Columns.includes('LicenseeTxId')) {
        Columns.splice(4, 0, 'LicenseeTxId');
        ColumnWidths.splice(4, 0, 110);
        ColumnAlignments.splice(4, 0, 'center-align tooltip');
    }

    return (
        <BaseDataGrid
            key={`refno_data_${uuidv4()}`}
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

export default memo(DataGrid);
