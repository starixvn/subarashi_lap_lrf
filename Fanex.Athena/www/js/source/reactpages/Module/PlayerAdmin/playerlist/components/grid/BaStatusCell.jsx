import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import LangHelper from '@jsroot/lib/langHelper';
import GridInteractionService from '../../lib/gridInteractionService';

const BaStatusCell = (props) => {
    const { dataItem, setPlayerList, toggleLoader, updateBaStatus } = props;
    const { CustId, BaStatus, OddsGroup } = dataItem;

    const handleChangeBaStatus = (event) => {
        const isBa = event.target.checked;
        const resourceName = isBa ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const param = { custId: CustId, isBa };
        toggleLoader(true);
        updateBaStatus(param).then(response => {
            const { Success, Message, ErrorMessage, ExtendedData } = response.data;
            if (Success) {
                const oddsGroup = ExtendedData || OddsGroup;
                const newPlayerList = GridInteractionService.updatePlayerWithBaStatus(playerList, CustId, isBa, oddsGroup);
                setPlayerList(newPlayerList);
            }
            else {
                const errMsg = Message || LangHelper.getSingleResource(ErrorMessage);
                window.alert(errMsg);
            }

            toggleLoader(false);
        }).catch(() => {
            toggleLoader(false);
        })
    }

    return (
        <Cell className="center-align">
            { BaStatus !== undefined && <Switcher checked={BaStatus} onChange={handleChangeBaStatus} /> }
        </Cell>
    )
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList, toggleLoader, updateBaStatus } = ActionCreators;
    return bindActionCreators({ setPlayerList, toggleLoader, updateBaStatus }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(BaStatusCell));