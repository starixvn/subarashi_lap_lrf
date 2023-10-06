import React from 'react';
import { ApiUrl, HeaderText } from '../../../common/lib/constants';
import BaseMobileDataGrid from '../../../common/components/BaseMobileDataGrid';
import AppData from '@jsroot/lib/AppData';
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import CompositeRow from '../../../../../components/mobile-component/CompositeRow';
import Service from '../../../common/lib/Service';
import MobileBetlistContent from './MobileBetlistContent';
import MobileWinLossCellContent from './MobileWinLossCellContent';
import { Cell } from '@9softstudio/react-grid';
import { useMemo } from 'react';

var Columns = [ 'Details', 'Stake', 'WinLoss', 'Icon'];

const MobileGrid = () => {
    const data = useSelector(state => state.gridData.Data )
    useEffect(() => {
    }, [data]);

    const isDisplayTxIdColumn = AppData.isAllowTxIDColumn;

    const getRows = () => {
        if (!data)
        {
            return null;
        }
        return data.map(item => renderCompositeRow(item))
    }

    const renderCompositeRow = (item) => {
        const expandRows = getExpandRows(item);
        return <CompositeRow key={item.RefNo} expandRows={expandRows}>
            <Cell><MobileBetlistContent item={item}/></Cell>
            <Cell className="right-align" dangerouslySetInnerHTML={{__html:item.Stake}}></Cell>
            <Cell className="right-align"><MobileWinLossCellContent item={item}/></Cell>
        </CompositeRow>
    }

    const getExpandRows = (item) => {
        let rows = [];
        if (isDisplayTxIdColumn)
        {
            rows.push(renderExpandRow("TxId", item.TransId));
        }
        rows.push(renderExpandRow(HeaderText.SystemId, item.SystemId));
        rows.push(renderExpandRow(Service.getHeaderName('LicenseeWL'), item.LicenseeWL));
        rows.push(renderExpandRow(HeaderText.Platform, item.Platform));
        rows.push(renderExpandRow(HeaderText.Live, item.Live))
        return rows;
    }

    const renderExpandRow = (key, value)  => {
        return <>
            <Cell className="right-align">{key}</Cell>
            <Cell colSpan={3} className="left-align" dangerouslySetInnerHTML={{__html:value}}></Cell>
        </>
    }

    const body = useMemo(() => getRows(), [data]);
    return (
        <BaseMobileDataGrid
            dataUrl={ApiUrl.REFNO_DATA_URL}
            isPaging={false}
            columns={Columns}
            body={body}
        />
    )
}

export default MobileGrid;
