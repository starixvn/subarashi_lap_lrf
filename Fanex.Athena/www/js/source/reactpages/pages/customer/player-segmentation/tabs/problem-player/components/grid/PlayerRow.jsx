import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';
import HyperLinkCell from '../../../../components/HyperLinkCell';

const PlayerRow = (props) => {
    const { dataItem, index, hasVipManagement, hasVipManagementEdit, showSubsidiary, onSelectPlayer } = props;
    const { custId, subsidiary, externalId, systemId, lastModifiedDate, customerClass, reasonList } = dataItem;

    const _renderReasonList = () => reasonList.map(reason => <div>{reason}</div>);
    const onClickExternalId = React.useCallback(() => onSelectPlayer({ custId, externalId, systemId }), [custId, externalId, systemId]);

    return (
        <Row key={`player_row_${custId}`}>
            {showSubsidiary && <Cell className="left-align">{subsidiary}</Cell>}
            <HyperLinkCell name={externalId} onClick={onClickExternalId} />
            <Cell className="left-align">{systemId}</Cell>
            <Cell className="center-align">{customerClass}</Cell>
            <Cell className="left-align">{_renderReasonList()}</Cell>
            <Cell className="center-align">{lastModifiedDate}</Cell>
            {hasVipManagement && <VipSwitcherCell index={index} hasVipManagementEdit={hasVipManagementEdit}/>}
        </Row>
    )
}

export default React.memo(PlayerRow);
