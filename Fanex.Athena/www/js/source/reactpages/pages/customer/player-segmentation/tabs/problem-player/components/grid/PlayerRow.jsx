import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';

export default (props) => {
    const { dataItem } = props;

    const { externalId, systemId, markDate, isMarkVoid } = dataItem;
    const _renderVipSwitcherCell = () => {
        return isMarkVoid ?
            <Cell className="center-align">
                <div className="cell-ticket-void">
                    <span>{LangHelper.getSingleResource('No')}</span>
                    <i class="icon icon-warning"></i>
                </div>
            </Cell>
            : <VipSwitcherCell dataItem={dataItem} />
    }

    return (
        <Row key={`player_row_${systemId}`}>
            <Cell className="center-align disabled">{externalId}</Cell>
            <Cell className="center-align">{systemId}</Cell>
            <Cell className="center-align">{markDate}</Cell>
            {_renderVipSwitcherCell()}
        </Row>
    )
}