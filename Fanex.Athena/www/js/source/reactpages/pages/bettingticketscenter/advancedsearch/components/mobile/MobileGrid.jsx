import React, { useMemo, useEffect, memo } from 'react';
import { ApiUrl, HeaderText } from '../../../common/lib/constants';
import BaseMobileDataGrid from '../../../common/components/BaseMobileDataGrid';
import AppData from '@jsroot/lib/AppData';
import { useSelector } from 'react-redux';
import CompositeRow from '../../../../../components/mobile-component/CompositeRow';
import Service from '../../../common/lib/Service';
import MobileBetlistContent from '../../../common/components/MobileBetlistContent';
import MobileWinLossCellContent from '../../../common/components/MobileWinLossCellContent';
import { Cell, Row } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper'

const Columns = ['Details', 'Stake', 'WinLoss', 'Icon'];
const SortableColumns = ['Stake', 'WinLoss'];
const MobileGrid = () => {
    const data = useSelector(state => state.gridData.Data)
    const totalData = useSelector(state => state.gridData.Total)
    useEffect(() => {
    }, [data]);

    const isDisplayTxIdColumn = AppData.isAllowTxIDColumn;

    const getRows = () => {
        if (!data) {
            return null;
        }
        return data.map(item => renderCompositeRow(item))
    }

    const renderCompositeRow = (item) => {
        const expandRows = getExpandRows(item);
        return <CompositeRow key={item.RefNo} expandRows={expandRows}>
            <Cell><MobileBetlistContent item={item} /></Cell>
            <Cell className="right-align cell-stake" dangerouslySetInnerHTML={{ __html: item.Stake }}></Cell>
            <Cell className="right-align cell-winloss"><MobileWinLossCellContent item={item} /></Cell>
        </CompositeRow>
    }

    const getExpandRows = (item) => {
        let rows = [];
        if (isDisplayTxIdColumn) {
            rows.push(renderExpandRow(HeaderText.LicenseeTxId, item.LicenseeTxId));
        }
        rows.push(renderExpandRow(HeaderText.SystemId, item.SystemId));
        rows.push(renderExpandRow(Service.getHeaderName('LicenseeWL'), item.LicenseeWL));
        rows.push(renderExpandRow(HeaderText.Platform, item.Platform));
        rows.push(renderExpandRow(HeaderText.Live, item.Live))
        return rows;
    }

    const renderExpandRow = (key, value) => {
        return <>
            <Cell className="right-align">{key}</Cell>
            <Cell colSpan={3} className="left-align" dangerouslySetInnerHTML={{ __html: value }}></Cell>
        </>
    }

    const renderFooter = () => {
        if (!totalData) {
            return null;
        }
        return (
            <Row className="fixed-table-grant-total">
                <Cell colSpan='2'>
                    <div className='cell-total'>
                        <div className='total-text'>{LangHelper.getSingleResource('Total')}</div>
                        <div className='total-stake'>{totalData.Stake}</div>
                    </div>
                </Cell>
                <Cell className="right-align cell-total-winloss" dangerouslySetInnerHTML={{ __html: totalData.WinLoss }}></Cell>
                <Cell></Cell>
            </Row>)
    }

    const body = useMemo(() => getRows(), [data]);
    const footer = useMemo(() => renderFooter(), [totalData])
    return (
        <BaseMobileDataGrid
            dataUrl={ApiUrl.ADVANCEDSEARCH_DATA_URL}
            isPaging={true}
            columns={Columns}
            body={body}
            footer={footer}
            sortableColumns={SortableColumns}
        />
    )
}

export default memo(MobileGrid);
