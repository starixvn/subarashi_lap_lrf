import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMemo } from 'react';

import AppData from '@jsroot/lib/AppData';
import { Cell, Row } from '@9softstudio/react-grid';
import { ApiUrl, HeaderText } from '../../../common/lib/constants';
import BaseMobileDataGrid from '../../../common/components/BaseMobileDataGrid';
import CompositeRow from '../../../../../components/mobile-component/CompositeRow';
import MobileBetlistContent from '../../../common/components/MobileBetlistContent';
import LangHelper from '@jsroot/lib/langHelper'

var Columns = [ 'Details', 'Stake', 'Status', 'Icon'];

const MobileGrid = () => {
    const data = useSelector(state => state.gridData.Data )
    const totalData = useSelector(state => state.gridData.Total)
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
            <Cell className="right-align" dangerouslySetInnerHTML={{__html:item.Status}}></Cell>
        </CompositeRow>
    }

    const getExpandRows = (item) => {
        let rows = [];
        if (isDisplayTxIdColumn)
        {
            rows.push(renderExpandRow("TxId", item.TransId));
        }
        rows.push(renderExpandRow(HeaderText.SystemId, item.SystemId));
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

    const renderFooter = () => {
        if(!totalData){
            return null;
        }
        return(
        <Row className="fixed-table-grant-total">
            <Cell>{LangHelper.getSingleResource('Total')}</Cell>
            <Cell>{totalData.Stake}</Cell>
            <Cell colSpan="2"></Cell>
        </Row>)
    }

    const body = useMemo(() => getRows(), [data]);
    const footer = useMemo(() => renderFooter(), [totalData]);
    return (
        <BaseMobileDataGrid
            dataUrl={ApiUrl.RUNNING_DATA_URL}
            isPaging={true}
            columns={Columns}
            body={body}
            footer={footer}
        />
    )
}

export default MobileGrid;
