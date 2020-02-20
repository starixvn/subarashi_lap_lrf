import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import VipSwitcherCell from './VipSwitcherCell';

export default (props) => {
    const {
        dataItem
    } = props;

    const { 
        ExternalId,
        SystemId, 
        MarkDate
    } = dataItem;

    return (
        <Row key={ExternalId}>
            <Cell className="center-align" onClick={() => alert('1')}>{ExternalId}</Cell>
            <Cell className="center-align">{SystemId}</Cell>
            <Cell className="center-align">{MarkDate}</Cell>
            <VipSwitcherCell dataItem={dataItem} />
        </Row>
    )
}