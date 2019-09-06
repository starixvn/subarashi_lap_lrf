import React from 'react';
import BetListDataGrid from '@jsroot/components/betlist/BetListDataGrid';

export const DataGrid = (props) => {
    const { data, total, pagingOption, onPaging, getResource, totalText, getHeaderName, onSort } = props;

    return (
        <BetListDataGrid
            isPaging={true}
            pageOption={pagingOption}
            onPaging={onPaging}
            getHeaderNameFunc={getHeaderName}
            columns={['Index', 'RefNo', 'TransTime', 'Choice', 'Odds', 'OddsType', 'Stake', 'WinLoss', 'LicenseeWL', 'Status', 'Platform', 'Live']}
            columnWidths={[40, 110, 150, 400, 70, 70, 80, 80, 80, 60, 60, 60]}
            sortableColumns={['Stake', 'WinLoss', 'LicenseeWL']}
            totalColumns={['Stake', 'WinLoss', 'LicenseeWL']}
            columnAlignments={[
                'center-align', 'center-align', 'center-align',
                'right-align', 'right-align', 'right-align', 'right-align', 'right-align', 'right-align',
                'center-align', 'center-align', 'center-align'
            ]}
            data={data}
            total={total}
            totalText={totalText}
            adjustedHeight={-20}
            getResourceFunc={getResource}
            onSort={onSort}
        />
    )
}

export default DataGrid;